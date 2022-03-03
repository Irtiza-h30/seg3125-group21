// Entry point for the application

// express application
const express = require("express");
// require the controller we make
const surveyController = require("./surveyController");

var app = express();

// set up template engine
app.set("view engine", "ejs");

// static file serving
app.use(express.static("./public"));

// fire function from surveyController
surveyController(app);

// listen to port
app.listen(3000);
console.log(`🚀 Server ready at http://localhost:3000`);
console.log(`View survey at http://localhost:3000/niceSurvey`);
console.log(`View results at http://localhost:3000/analysis`);
