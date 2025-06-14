const express = require("express");
const connectToDb = require("./config/connectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();

// Connection To DB
connectToDb();

// Iint App
const app = express();

//Middlewares
app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//  routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categorys", require("./routes/categoryRoute"));

// Save Img in images
app.use("/images", express.static("images"));

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Servier is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
