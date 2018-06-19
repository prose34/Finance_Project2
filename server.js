// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************

// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require ("express-session");
var exphbs = require('express-handlebars');
var env = require('dotenv').load();
// var moment = require('moment');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));


// For Passport 
// =============================================================
app.use(session({secret:'keyboard cat', resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions




// MODELS 
// =============================================================

var models = require("./models");

// Routes
// =============================================================
require("./routes/html-routes.js")(app,passport);  // change the routes!
// var authRoute = require('./app/routes/auth.js')(app); // not needed anymore becuase we put the auth.js inside the // html routes

// Load passport strategies from passport.js
// =============================================================
require("./config/passport/passport.js")(passport, models.User);


// Sync Database 
// =============================================================
models.sequelize.sync().then(function(){
  console.log("Looking Good!")
}).catch(function(err){
  console.log(err, "Something went wrong!!!!")
});


// For Handlebars
// =============================================================
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

require("./routes/portfolio-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() { //DO NOT USE { force: true }
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
