const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// const { dirname } = require("path");
// const { fileURLToPath } = require("url");
const path = require("path");

const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

require("express-async-errors");
const morgan = require("morgan");
//* db and authenticateUser
const connectDB = require("./db/connect");

//~ routers
const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobsRoutes");

//!Middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authenticateUser = require("./middleware/auth");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
// console.log("hello");
// console.log("hello");
// console.log("hello");
// console.log("hello");

app.get("/api/v1", (req, res) => {
  // throw new Error("error");
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
// const port = 5000;

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
