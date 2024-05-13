import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
