import orderModel from "../models/order.js";

class OrderController {
    static placeOrder = async (req, res) => {
        try {
            const { bookId, quantity, price} = req.body
            const userId = req.user

            if(bookId && quantity && price) {
                const newDoc = new orderModel({
                    user : userId,
                    book: bookId,
                    quantity: quantity,
                    price: price,
                    totalPrice : parseInt(quantity*price)
                })

                const newOrder = await newDoc.save()

                res.status(200).send({type: "success", message: "Order Created Successfully", data : newOrder });

            } else {
                res.status(200).send({type: "error", message: "All Fields are required" });
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default OrderController