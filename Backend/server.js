const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
const express = require("express");
const path = require("path");

let DB_CON_STRING = process.env.DB_CON_STRING.replace(
    "<password>",
    process.env.DB_PASSWORD
);

mongoose
    .connect(DB_CON_STRING)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const app = require("./app");

///serve static assets...specifying the folder in which heroku wants to search
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    //serve static file
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        );
    });
}

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
