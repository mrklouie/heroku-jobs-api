require("dotenv").config();
require("express-async-errors");

// Extra Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

//Routers
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

//Middlewares
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticateUser = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Jobs API </h1>");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`http://localhost:5000/`));
  } catch (err) {
    console.log(err);
  }
};

start();

app.use(notFound);
app.use(errorHandlerMiddleware);
