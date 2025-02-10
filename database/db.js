/* eslint-disable no-undef */
import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("DB_URI is not provided");
}

const connectDB = async () => {

    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}


export default connectDB;