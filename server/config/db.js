const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blog-platform";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;