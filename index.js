const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  app.get("/", (req, res) => {
    res.send("Welcome to the Recipe API!");
  });

  
// Routes
app.use("/api", recipeRoutes);

// Server setup
const PORT = process.env.PORT || 3000; // Port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
