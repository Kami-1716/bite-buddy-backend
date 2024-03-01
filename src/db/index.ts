import mongoose from "mongoose";
import { dbName } from "../constants";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log(`\n MongoDB connected!!: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to the database: ", error);
    process.exit(1);
  }
};

export default connectDB;
