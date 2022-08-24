const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const entryRouter = require("./routes/entryRoutes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

app.use(express.json({ limit: "50mb" }));

//basically it converts the incoming body from json to js Object
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/entries", entryRouter);

app.use(errorHandler);

module.exports = app;
