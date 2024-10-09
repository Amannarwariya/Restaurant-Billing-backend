// index.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./DB/Connectdb");
const web = require("./Routes/web");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
connectDB();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.json());
app.use("/api", web);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
