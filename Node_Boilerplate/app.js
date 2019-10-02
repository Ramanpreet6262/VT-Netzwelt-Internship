const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const validateRoutes = require("./routes/validation");

const messages = require("./messages/messages");

require("dotenv").config();

const app = express();

const logDirectory = path.join(__dirname, "log");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

function pad(num) {
  return (num > 9 ? "" : "0") + num;
}

function generator(time, index) {
  if (!time) return "access.log";

  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  return (
    month +
    "/" +
    month +
    day +
    "-" +
    hour +
    minute +
    "-" +
    index +
    "-access.log"
  );
}

// create a rotating write stream
var accessLogStream = rfs(generator, {
  interval: "1d", // rotate daily
  path: logDirectory
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());
app.use(
  expressSession({
    secret: "A keyboard, cat",
    saveUninitialized: false,
    resave: true
  })
);

// dotenv implementation using a route to send a environment variable in return
// app.get('/dotenv', (req, res) => {
//     res.send(process.env.TOKEN);
// });

// middleware for our routes
app.use(validateRoutes);

// middleware for 404 request
app.use((req, res, next) => {
  const error = new Error(messages.notFound);
  error.status = 404;
  next(error);
});

// middleware for common error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
