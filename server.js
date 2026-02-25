/*
CSC3916 HW2
File: Server.js
Description: Web API scaffolding for Movie API
 */

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
db = require('./db')(); //hack
var jwt = require('jsonwebtoken');
var cors = require('cors');
require('dotenv').config();
const userAuthRouter = require('./routes/authUsers'); // Import from authUsers.js
const movieRouter = require('./routes/movies');


const secretKey =  process.env.UNIQUE_KEY;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/authUsers', userAuthRouter); // Tells requests starting with /authUsers to userAuthRouter
app.use('/movies', movieRouter); // tells requests starting /movies to movieRouter

var router = express.Router();


// Homepage Route
router.route('/')
    .get((req, res) => {
        res.status(200).send("My API is up and running on Render!");
    });


router.route('/testcollection')
    .delete(authController.isAuthenticated, (req, res) => {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }
        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    }
    )
    .put(authJwtController.isAuthenticated, (req, res) => {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }
        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    }
    );



    
app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only


