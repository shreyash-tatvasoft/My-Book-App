import express from "express";
import UserController from "../controllers/userControllers.js";
import checkuserAuth from "../middlewares/auth-middleware.js";


const router = express.Router();

// Route Level middleware
router.use("/changeUserPassword", checkuserAuth)
router.use("/userInfo", checkuserAuth)
router.use("/wishlist/add", checkuserAuth)
router.use("/wishlist/remove", checkuserAuth)
router.use("/wishlist/list/:id", checkuserAuth)
router.use("/borrow/books", checkuserAuth)



// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)


router.post('/resetPassword', UserController.resetPassword)
router.post('/forgotPassword', UserController.forgotPassword)


// Private Routes
router.post("/changeUserPassword", UserController.changeUserPassword)
router.get("/userInfo", UserController.loggedUserInfo)

router.put("/wishlist/add", UserController.addToWishlist)
router.delete("/wishlist/remove", UserController.removeFromWishlist)
router.get("/wishlist/list/:id", UserController.getAllWishlist)
router.put("/borrow/books", UserController.borrowBook)



export default router