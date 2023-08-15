const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//* db and authenticateUser
const connectDB = require("./db/connect");

//~ routers
const authRouter = require("./routes/authRoutes");

//!Middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.get("/", (req, res) => {
  // throw new Error("error");
  res.send("Welecom bashar");
});

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
