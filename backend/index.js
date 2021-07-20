const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config({ path: "./.env.local" });

const app = express();
app.use(cors());
app.use(express.json());
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   }
// })
// var upload = multer({ storage: storage }).single('file')
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const publicRoutes = require("./routes/publicRoutes");

// DB connection
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("error: ", error);
    }
    console.log(
      "mongoose.connection.readyState: ",
      mongoose.connection.readyState
    );
  }
);

publicRoutes(app);

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log("server is listing on port: ", port);
});
