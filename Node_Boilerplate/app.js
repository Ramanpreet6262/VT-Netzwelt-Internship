const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const i18n = require("i18n");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const multer = require("multer");

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

// configuring i18n module
i18n.configure({
  //it defines how many languages we would support in our application
  locales: ["en", "de"],

  //it defines the path to language json files, default is /locales
  directory: path.join(__dirname, "locales"),

  //it defines the default language
  defaultLocale: "en",

  //it defines a custom cookie name to parse locale settings from it
  cookie: "i18n"
});

app.use(cookieParser("A keyboard, cat"));

app.use(
  expressSession({
    secret: "A keyboard, cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

//init i18n to use it in app
app.use(i18n.init);

// dotenv implementation using a route to send a environment variable in return
// app.get('/dotenv', (req, res) => {
//     res.send(process.env.TOKEN);
// });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer middleware  (Imp thing to keep in mind that this middleware should be used before middleware for routes)
app.use(multer({storage: fileStorage, fileFilter: fileFilter, limits: 100000}).single('image'));

// middleware for our routes
app.use(validateRoutes);

// middleware for 404 request
app.use((req, res, next) => {
  // const error = new Error(messages.notFound);
  const error = new Error(res.__("notFound"));
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
