import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRoutes from './routes/userRoutes.js'
import bookRoutes from "./routes/bookRoutes.js"

const app = express();
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy 
app.use(cors())

// Static file display
app.use(express.static('uploads/'))

// JSON
app.use(express.json())

// DB Connection
connectDB(DATABASE_URL)

// Load Routes 
app.use("/api/user", userRoutes)
app.use("/api/book", bookRoutes)

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})