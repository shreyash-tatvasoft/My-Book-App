import mongoose from "mongoose";

// Define Schema
const userSchema = new mongoose.Schema({
    name: { type : String, required: true, trim: true},
    email: { type : String, required: true, trim: true},
    password: { type : String, required: true, trim: true},
    term: { type : Boolean, required: true},
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    borrowedBooks: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
            borrowDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/  },
            dueDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/  }
        }
    ],
    wishlist : [{ type : mongoose.Schema.Types.ObjectId, ref: "books"}]
})

// Create Model
const userModel = mongoose.model("user", userSchema)

export default userModel;