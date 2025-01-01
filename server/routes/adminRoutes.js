import express from "express";
import AdminController from "../controllers/adminController.js";
import checkAdminRole from "../middlewares/admin-auth-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/list/orders", checkAdminRole)
router.use("/list/users", checkAdminRole)
router.use("/list/books", checkAdminRole)
router.use("/order/confirm", checkAdminRole)


// Private Routes
router.get('/list/orders', AdminController.getAllOrders)
router.get('/list/users', AdminController.getAllUsers)
router.get('/list/books', AdminController.getAllBooks)
router.patch('/order/confirm', AdminController.updateOrder)


export default router