var express = require('express'); // call express
var app = express(); // define our app using express
var mysql = require('mysql'); // Calling mysql module

var port = process.env.PORT || 8080; // set our port

// Creating mysql connection 
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'netzwelt',
        database: 'learningnode'
    });
    res.locals.connection.connect(function (err) {
        if (err) throw err;
        console.log("connected to database");
    });
    next();
});

// ROUTES FOR OUR API
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// more routes
router.route('/customers')

    // GET request to retreive all customers 
    .get(function (req, res) {
        res.locals.connection.query("SELECT * from customers", function (error, results, fields) {
            if (error) {
                //If there is error, we send the error in the error section with 500 status
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                //If there is no error, all is good and response is 200OK.
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
    });

    



// // post request (accessed at POST http://localhost:8080/api/parts)
// .post(function (req, res) {
//     res.json({
//         message: 'POST successful!!'
//     });
// })


//con.end();




// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);