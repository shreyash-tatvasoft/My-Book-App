import express from "express";
import OrderController from "../controllers/orderController.js";
import checkuserAuth from "../middlewares/auth-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/create", checkuserAuth)

// Private Routes
router.post('/create', OrderController.placeOrder)


export default router