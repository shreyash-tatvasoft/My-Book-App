import mongoose from "mongoose";

// Define Schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
})

// Create Model
const orderModel = mongoose.model("order", orderSchema)

export default orderModel