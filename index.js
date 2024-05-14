const express = require("express");
const urlRouter = require("./routes/urls");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const path = require("node:path");
const cookieParser = require('cookie-parser');

const { dbConnect } = require("./connection");
const { handleAuth, checkAuth, checkForAuthentication, restrictTo } = require("./middlewares/auth");
dbConnect("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDb Connected Successfully."))
  .catch((error) => console.log("MongoDb Connection failed.", error));

const app = express();
const PORT = 8000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(['custom', 'admin']), urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(8000, () => console.log(`Server started at port: ${PORT}`));
