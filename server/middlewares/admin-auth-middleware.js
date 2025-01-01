import userModel from "../models/user.js";
import jwt from "jsonwebtoken"

const checkAdminRole = async (req, res, next) => {
    try {
        const token = req.headers.token

        if(token) {
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await userModel.findById(userID).select("-password").populate("wishlist")

            const userRole = req.user.role

            if(userRole === "admin") {
                next()
            } else {
                res.status(400).send({type: "error", "message" : "You do not have access to perform this action" });
            }

        } else {
           res.status(200).send({type: "error", message: "Invalid Token" });
        }
    } catch (error) {
        console.log(error)
    }
}

export default checkAdminRole;