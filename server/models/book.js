import mongoose from "mongoose";

// Define Schema
const bookSchema = new mongoose.Schema({
    book_title: { type : String, required: true, trim: true},
    auther_name: { type : String, required: true, trim: true},
    book_description: { type : String, required: true, trim: true},
    book_catogory: { type : String, required: true, trim: true},
    book_price: { type : String, required: true, trim: true},
    book_image: {type: String, required: true},
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

// Create Model
const bookModel = mongoose.model("books", bookSchema)

export default bookModel;