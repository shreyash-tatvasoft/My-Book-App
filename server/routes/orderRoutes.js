import express from "express";
import OrderController from "../controllers/orderController.js";
import checkuserAuth from "../middlewares/auth-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/create", checkuserAuth)
router.use("/list", checkuserAuth)

// Private Routes
router.post('/create', OrderController.placeOrder)
router.get('/list', OrderController.getAllOrders)


export default router