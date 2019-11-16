const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const fs = require('fs');
const creds = '';

const redis = require('redis');
const client = '';

const port = process.env.PORT || 8080;

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Start the Server
http.listen(port, function() {
    console.log('Server Started. Listening on *:' + port);
});

// Store people in chatroom
let chatters = [];

// Store messages in chatroom
let chat_messages = [];