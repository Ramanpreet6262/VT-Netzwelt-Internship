const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const validateRoutes = require('./routes/validation');

const messages = require("./messages/messages");

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator());
app.use(expressSession({
    secret: 'A keyboard, cat',
    saveUninitialized: false,
    resave : true
}));

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

const port = process.env.PORT ||  8000;

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
});

