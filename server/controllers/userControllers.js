import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bookModel from "../models/book.js";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, confirm_password, tc, role } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(200).send({type: "error", message: "Email already exist" });
    } else {
      if (name && email && password && confirm_password && tc) {
        if (password === confirm_password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt)
            const doc = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              term: tc,
              role
            });

            await doc.save();
            const savedUser = await userModel.findOne({ email: email})
            const token = jwt.sign({ userID : savedUser._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1d'})
            res.status(201).send({type: "success", message: "User Registered Succefully", "token" : token });
          } catch (error) {
            console.log(error);
          }
        } else {
          res
            .status(200)
            .send({type: "error", message: "Password and Confirm Password does not match" });
        }
      } else {
        res.status(200).send({type: "error", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password} = req.body;

      if(email && password) {
        const user = await userModel.findOne({ email: email });
        if(user === null) {
          res.status(200).send({type: "error", message: "Email does not exist" });
        } else {
          const isPwdMatch = await bcrypt.compare(password, user.password) 
          if(email === user.email && isPwdMatch) {
            const token = jwt.sign({ userID : user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1d'})
            res.status(200).send({type: "success", message: "Login success", "token": token });
          } else {
           res.status(200).send({type: "error", message: "Email or Password is incorrect" });
          }
        }

      } else {
        res.status(200).send({type: "error", message: "All fields are required" });
      }

    } catch (error) {
      console.log(error)
    }
  }

  static resetPassword = async (req, res) => {
    try {

      const token = req.headers.token
      const { password, confirm_password} = req.body

      if(token) {
        
        if(password && confirm_password) {
          if(password === confirm_password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)
            const Id = jwt.verify(token, process.env.JWT_SECRET_KEY)
            await userModel.findByIdAndUpdate({_id: Id.userID}, {password: hashPassword})
            res.status(200).send({ "type" : "success", "message": "Password updated succefully"})
          } else {
            res
            .status(200)
            .send({type: "error", message: "Password and Confirm Password does not match" });
          }
        } else {
           res.status(200).send({type: "error", message: "All fields are required" });
        }

        
      } else {
        res.status(200).send({ "type" : "error", "message": "Invalid Token"})
      }
    } catch (error) {
      console.log(error)
    }
  }

  static changeUserPassword = async (req, res) => {
    try {

      const token = req.headers.token
      const { password, confirm_password} = req.body
  
        if(password && confirm_password) {
          if(password === confirm_password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)
            await userModel.findByIdAndUpdate(req.user._id, { $set : {password: hashPassword}} )
            res.status(200).send({ "type" : "success", "message": "Password updated succefully"})
          } else {
            res
            .status(200)
            .send({type: "error", message: "Password and Confirm Password does not match" });
          }
        } else {
           res.status(200).send({type: "error", message: "All fields are required" });
        }
 
    } catch (error) {
      console.log(error)
    }
  }

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body
      if(email) {
        const user = await userModel.findOne({ email: email });
        if(user === null) {
          res.status(200).send({type: "error", message: "Please enter valid Email." });
        } else {
          const token =  jwt.sign({ userID: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1d'})

        res.status(200).send({type: "success", message: "Reset password Link sent to email", id: token });
        }

      } else {
        res.status(200).send({type: "error", message: "Please provide valid email" });
      }
    } catch (error) {
      console.log(error)
    }
  }

  static loggedUserInfo = async (req,res) => {
    try {
      res.status(200).send({"type": "success" ,"data" : req.user})
    } catch (error) {
      console.log(error)
    }
  }

  static getAllWishlist = async (req,res) => {
    try {

      const userId = req.params.id

      const user = await userModel.findById(userId).populate("wishlist").select("-password");

      if(!user) {
        return res.status(200).send({"type": "error" ,"message" : "User not found"})
      }

      return res.status(200).send({"type": "success" ,"data" : user.wishlist})
      
    } catch (error) {
      console.log(error)
    }
  }

  static addToWishlist = async (req,res) => {
    try {
      const { bookId, userId } = req.body;

      const user = await userModel.findById(userId)

      if(!user) {
        return res.status(200).send({"type": "error" ,"message" : "User not found"})
      }

      const book = await bookModel.findById(bookId);
      if(!book) {
        return res.status(200).send({"type": "error" ,"message" : "Book not found"})
      }

      // Added book to wishlist
      if (!user.wishlist.includes(bookId)) {
        user.wishlist.push(bookId);
        await user.save();
      }

      return res.status(200).send({"type": "success" ,"message" : "Book added to wishlist"})

    } catch (error) {
      console.log(error)
    }
  }

  static removeFromWishlist = async (req,res) => {
    try {
      const { bookId, userId } = req.body;

      const user = await userModel.findById(userId)

      if(!user) {
        return res.status(200).send({"type": "error" ,"message" : "User not found"})
      }

      const book = await bookModel.findById(bookId);
      if(!book) {
        return res.status(200).send({"type": "error" ,"message" : "Book not found"})
      }

      // Removd book from wishlist
      const bookIndex = user.wishlist.indexOf(bookId);
      if (bookIndex > -1) {
        user.wishlist.splice(bookIndex, 1);
        await user.save();
      }

      return res.status(200).send({"type": "success" ,"message" : "Book removed from wishlist"})

      
    } catch (error) {
      console.log(error)
    }
  }

  static borrowBook = async (req, res) => {
    try {
      const { borrowedBooks } = req.body;

      const userId = req.user._id

      if (!Array.isArray(borrowedBooks)) {
        return res.status(400).send({ type: "error", message: "Please enter valid details" });
      }

      // Extract all bookIds from the request
      const bookIds = borrowedBooks.map(book => book.bookId);

      // Check if all bookIds exist in the books collection
      const existingBooks = await bookModel.find({ _id: { $in: bookIds } });
      const existingBookIds = existingBooks.map(book => book._id.toString());

      // Find invalid bookIds
      const invalidBooks = bookIds.filter(bookId => !existingBookIds.includes(bookId));

      if (invalidBooks.length > 0) {
        return res.status(404).send({ type: "error", message: "Books Not Found!" });
      }

      // Check for books already borrowed by the user
      const user = await userModel.findById(userId);

      const alreadyBorrowed = user.borrowedBooks
        .map(book => book.bookId.toString())
        .filter(bookId => bookIds.includes(bookId));

      if (alreadyBorrowed.length > 0) {
        return res.status(404).send({ type: "error", message: "Books are already borrowed!" });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $push: { borrowedBooks: { $each: borrowedBooks } } }, // Add multiple entries to the array
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).send({ type: "error", message: "user Not Found!" });
      }

      return res.status(200).send({ "type": "success", "message": "Book Borrowed Successfully", data: updatedUser })


    } catch (error) {
      console.log(error)
    }
  }

}

export default UserController
