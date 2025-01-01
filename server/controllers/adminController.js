import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import bookModel from "../models/book.js";

class AdminController {
    static getAllOrders = async (req,res) => {
        try {
            const token = req.headers.token

            if(token) {
                const ordersData = await orderModel.find().populate("user", "name email").populate("book", "book_title auther_name book_price")
                res.status(200).send({type: "success", data : ordersData });
            } else {
                res.status(200).send({type: "error", message: "Invalid Token" });
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    static getAllUsers = async (req,res) => {
        try {

            const token = req.headers.token

            if(token) {
                const usersData = await userModel.find().select("-password").populate("wishlist")
                const users = usersData.filter(user => user.role !== "admin")
                res.status(200).send({type: "success", data : users });
            } else {
                res.status(200).send({type: "error", message: "Invalid Token" });
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    static getAllBooks = async (req,res) => {
        try {

            const token = req.headers.token

            if(token) {
                const booksData = await bookModel.find()
                res.status(200).send({type: "success", data : booksData });
            } else {
                res.status(200).send({type: "error", message: "Invalid Token" });
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    static updateOrder = async (req, res) => {
        try {
            const { orderId, status } = req.body

            const validStaus =["pending", "completed", "cancelled"]

            if(orderId && validStaus.includes(status)) {
                await orderModel.findByIdAndUpdate(orderId, { status : status})
                res.status(200).send({type: "success", message : "Order Updated Successfully" });
            } else {
                res.status(200).send({type: "error", message: "Order Not Found!" });
            }
           
        } catch (error) {
            console.log(error)
        }
    }
}

export default AdminController
