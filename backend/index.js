const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const cors = require("cors");
require("dotenv").config({ path: "./.env.local" });

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

require("./config/passport")(passport);

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
