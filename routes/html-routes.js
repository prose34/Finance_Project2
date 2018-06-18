// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app, passport) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
    // res.send('Welcome to Passport with Sequelize');
  });
    
  app.post('/signup', passport.authenticate('local-signup', {
    
    successRedirect: '/portfolio',

    failureRedirect: '/'
    
  }));


  // portfolio route loads portfolio.html
  app.get("/portfolio", isLoggedIn, function(req, res) {
    console.log(JSON.stringify(req.user))
    res.sendFile(path.join(__dirname, "../public/portfolio.html"));
  });

  // research route loads research.html
  app.get("/research", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/research.html"));
  });

  app.get('/logout', function(req,res) {
    
    
    req.session.destroy(function(err) {
    
      res.redirect('/');

    });
  });

  
  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/portfolio',
      failureRedirect: '/'

  }));

 
  function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/signin');
 
  } 

};


// USE APP.USE FOR HOME