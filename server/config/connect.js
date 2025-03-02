import mongoose from "mongoose";
const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    return conn;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default connectDB;
