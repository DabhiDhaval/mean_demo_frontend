// Purpose: Main server file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use("/students", studentRoutes);

// MongoDB Connection
mongoose.connect("mongodb://43.205.133.116:27017/mern_demo")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/students", studentRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});