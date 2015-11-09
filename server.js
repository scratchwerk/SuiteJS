/**
 * Created by Ronnie on 11/9/2015.
 */

var mongoose   = require('mongoose');
mongoose.connect('mongodb://rking:d!cksW1ngs@ds051553.mongolab.com:51553/testsuite'); // connect to our database

var Mentor     = require('./app/models/mentor');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1911;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// ---------Mentor-------------------------------------
router.route('/mentor')

// create a topic (accessed at POST http://localhost:8080/api/statements)
    .post(function(req, res) {

        console.log('About to create a mentor');
        var mentor = new Mentor();
        mentor.firstname = req.body.firstname;
        mentor.lastname = req.body.lastname;

        // save mentor and check for errors
        mentor.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Mentor created!' });
        });

    })

// get all the mentors
    .get(function(req, res) {
        Mentor.find(function(err, mentors) {
            if (err)
                res.send(err);

            res.json(mentors);
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our scratchwerk suite api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);