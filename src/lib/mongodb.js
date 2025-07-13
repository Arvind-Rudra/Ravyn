import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ravyn",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

export default connectMongoDB;
