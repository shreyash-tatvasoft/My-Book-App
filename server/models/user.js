import mongoose from "mongoose";

// Define Schema
const userSchema = new mongoose.Schema({
    name: { type : String, required: true, trim: true},
    email: { type : String, required: true, trim: true},
    password: { type : String, required: true, trim: true},
    term: { type : Boolean, required: true}
})

// Create Model
const userModel = mongoose.model("user", userSchema)

export default userModel;