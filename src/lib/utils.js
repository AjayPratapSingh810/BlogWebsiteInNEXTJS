import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
    try {
        if (connection.isConnected) {
            console.log("database is connected");
        }
        const db = await mongoose.connect("mongodb://localhost:27017/BlogWebsiteWithNext");
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        throw new Error("Database is not connected");
    }


}    