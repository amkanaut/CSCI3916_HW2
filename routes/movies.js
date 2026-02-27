let envPath = __dirname + "/../.env"
require('dotenv').config({path:envPath});
const express = require('express');
const authJwtController = require('../auth_jwt');
const authController = require('../auth');

const router = express.Router();


function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

// Route for /movies
router.route('/')
    .get((req, res) => {
        // Implementation here
       const o = getJSONObjectForMovieRequirement(req); // Using helper function
       o.status = 200; // Directly creating a status method // Sends back status    
       o.message = "GET movies" // Sends back this message
       o.query = req.query; // Queries the the headers and sends back?
       
    
       res.status(200).json(o); // tells Express the status
    })
    .post((req, res) => {
        // Implementation here
        const o = getJSONObjectForMovieRequirement(req);
        o.status = 200;
        o.message = "movie saved"
        o.query = req.query; 

        res.status(200).json(o); // tells Express the status
    })
    .put(authJwtController.isAuthenticated, (req, res) => {
        // HTTP PUT Method
        const o = getJSONObjectForMovieRequirement(req);
        // Requires JWT authentication.
        // JWT Authentication is put into parameters of .put method to implement
        // Returns a JSON object with status, message, headers, query, and env.
        
        o.status = 200;
        o.message = "movie updated";
        o.query = req.query;
        res.status(200).json(o); // tells Express the status
    })
    .delete(authController.isAuthenticated, (req, res) => {
        // HTTP DELETE Method
        // Requires Basic authentication.
        // Returns a JSON object with status, message, headers, query, and env.
        var o = getJSONObjectForMovieRequirement(req);
        o.query = req.query;
        o.status = 200;
        o.message = "movie deleted";
        res.status(200).json(o); // tells Express the status
    })
    .all((req, res) => {
        // Any other HTTP Method
        // Returns a message stating that the HTTP method is unsupported.
        res.status(405).send({ message: 'HTTP method not supported.' });
    });

    module.exports = router; // Exporting so other files can access // How it connects to server.js