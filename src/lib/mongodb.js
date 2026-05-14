import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://accumax105_db_user:Btj91ZGWkY3aO9X8@cluster0.suzor3u.mongodb.net/accumax_db?retryWrites=true&w=majority";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI); // ✅ NO OPTIONS

    isConnected = true;
    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    throw error;
  }
}

