import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connentDB = async () => {
    try {
        const connentionDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connented with DB host ${connentionDB.connection.host}`);
    } catch (error) {
        console.log("Err while connent with DB", error);
        process.exit(1);
    }
}

export default connentDB