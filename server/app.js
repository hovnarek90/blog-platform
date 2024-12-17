const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes.router); // Integrate authentication routes
app.use("/api/posts", postRoutes);

// Example protected route
app.get("/api/profile", authRoutes.authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", userId: req.user.userId });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
