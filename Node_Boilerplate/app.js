const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
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

const validateRoutes = require('./routes/validation');

app.use(validateRoutes);

const port = process.env.PORT ||  8000;

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
});

