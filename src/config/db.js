const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    if (mongoUri.startsWith("mongodb+srv://")) {
      dns.setServers(["1.1.1.1", "8.8.8.8"]);
      console.log("Using public DNS for SRV resolution:", dns.getServers());
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;