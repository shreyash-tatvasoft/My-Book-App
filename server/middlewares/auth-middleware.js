import userModel from "../models/user.js";
import jwt from "jsonwebtoken"

const checkuserAuth = async (req, res, next) => {
    try {
        const token = req.headers.token

        if(token) {
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await userModel.findById(userID).select("-password")
            next()

        } else {
           res.status(200).send({type: "error", message: "Invalid Token" });
        }
    } catch (error) {
        console.log(error)
    }
}

export default checkuserAuth;