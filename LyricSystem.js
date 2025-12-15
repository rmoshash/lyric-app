const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7004;
const bodyParser = require("body-parser");
const lyricsRouter = require("./routes/lyric")
const mongoose = require("mongoose");
// require("dotenv").config({
//     path: path.resolve(__dirname, "credentialsDontPost/.env"),
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=> console.log("Mongo connected"))
.catch(err => console.error("Mongo error: ", err));

app.use('/', lyricsRouter);
app.listen(portNumber)
