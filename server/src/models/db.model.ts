
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("strictQuery", false);

const mongoDB = process.env.DATABASE_URL;

async function connectDB() {
  try {
    if (mongoDB) {
      await mongoose.connect(mongoDB);
      console.log("Connected to MongoDB successfully");
    } else {
      throw new Error("DATABASE_URL is not defined in the environment variables");
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

export default connectDB;





// require('dotenv').config()
// import mongoose from "mongoose";
// mongoose.set("strictQuery", false);
// const mongoDB  = process.env.DATABASE_URL;

// main().catch((err) => console.log(err));
// async function main() {
//     if(mongoDB){
//         await mongoose.connect(mongoDB!);
//     }
// }
// module.exports = mongoose;