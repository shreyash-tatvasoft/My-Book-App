import express from "express";
import BookController from "../controllers/bookControllers.js";
import checkuserAuth from "../middlewares/auth-middleware.js";
import upload from "../middlewares/book-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/add", checkuserAuth)


// File Middleware
router.use("/add", upload.single("image"))

// Public Routes
router.get("/list", BookController.getBooksList)
router.get("/list/:id", BookController.getBookDataById)

// Private Routes
router.post('/add', BookController.addNewBook)




export default router