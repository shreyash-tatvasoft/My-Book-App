import express from "express";
import UserController from "../controllers/userContrillers.js";
import checkuserAuth from "../middlewares/auth-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/changeUserPassword", checkuserAuth)
router.use("/userInfo", checkuserAuth)


// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)


router.post('/resetPassword', UserController.resetPassword)
router.post('/forgotPassword', UserController.forgotPassword)


// Private Routes
router.post("/changeUserPassword", UserController.changeUserPassword)
router.get("/userInfo", UserController.loggedUserInfo)



export default router