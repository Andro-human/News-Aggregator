import mongoose from "mongoose";
import { seedDb } from '../utils/seeder.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected To MongoDb Database ${mongoose.connection.host}`);

    await seedDb("");
  } catch (error) {
    console.log(`MongoDb Database Error ${error}`);
  }
};

export default connectDB;
