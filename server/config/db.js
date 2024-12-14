const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Initializing database connection...");
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:2701/blog-platform";
  console.log("Database URI:", MONGO_URI);

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
