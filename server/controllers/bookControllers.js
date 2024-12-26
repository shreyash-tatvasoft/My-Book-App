import mongoose from "mongoose"
import bookModel from "../models/book.js"

class BookController {
    static addNewBook = async (req, res) => {
            try {
                const { title, auther, description,price, catogory } = req.body
                const img = req.file && req.file.filename

                if(title && auther && description && price && catogory && img) {
                    const bookInfo = new bookModel({
                        book_title : title,
                        auther_name: auther,
                        book_description : description,
                        book_catogory : catogory,
                        book_price : price,
                        book_image : img,
                    })

                    const newBook = await bookInfo.save()

                    res.status(200).send({type: "success", message: "Book Added Successfully", data : newBook });

                } else {
                    res.status(200).send({type: "error", message: "All Fields are required" });
                }

                    
            } catch (error) {
                console.log(error)
            }
    }

    static getBooksList = async (req, res) => {
        try {
            const allBooksData = await bookModel.find()

            if(allBooksData.length > 0) {
                res.status(200).send({type: "success", data: allBooksData })
            } else {
                res.status(404).send({type: "error", data: [] })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static getBookDataById = async (req, res) => {
        try {
            const bookId = req.params.id

            const data = await bookModel.findById(bookId)

            if(data && data._id) {
                res.status(200).send({type: "success", data: data })
            } else {
                res.status(404).send({type: "error", message : "Invalid Details" })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default BookController