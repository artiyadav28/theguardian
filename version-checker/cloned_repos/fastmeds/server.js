const express = require("express");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const app = express();
const path = require("path");
//connect database
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};
connectDB();

//init middleware
app.use(express.json({ extended: false }));
//app.get("/", (req, res) => res.send("API Running"));

//routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/search", require("./routes/api/search"));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
