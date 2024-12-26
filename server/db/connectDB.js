import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
   try {
    const DB_OPTIONS = {
        dbName : "bookManagementShop"
    }

    await mongoose.connect(DATABASE_URL, DB_OPTIONS)
    console.log("Server Connected Succeffully.....")
   } catch (error) {
     console.log(error)
   }
}

export default connectDB;