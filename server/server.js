const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Blockroutes = require("./apis/Universalapi");
const authRoutes = require("./apis/auth");
const dataRouter = require("./apis/dataRouter");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://root:root@it3fsd.6cqlrhg.mongodb.net/MIS?retryWrites=true&w=majority&appName=it3fsd",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Mount routes
app.use("/api/block", Blockroutes);
app.use("/auth", require("./apis/auth"));
app.use("/data", dataRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
