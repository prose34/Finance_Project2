// *********************************************************************************
// portfolio-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/portfolio", function(req, res) {
    // findAll returns all entries for a table when used with no options
    // console.log(req.user);
    db.Investment.findAll({
        where: {
          UserId: req.user.id
        }
    }).then(function(dbInvestment) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbInvestment);
    //   console.log(dbInvestment);
    
    });
  });

  // POST route for saving a new todo
  app.post("/api/portfolio", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Investment.create({
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        totalShares: req.body.totalShares,
        purchaseDate: req.body.purchaseDate,
        UserId: req.user.id
    }).then(function(dbInvestment) {
      // We have access to the new investment as an argument inside of the callback function
      res.json(dbInvestment);
    //   console.log(dbInvestment);
    });
  });

  // DELETE route for deleting an investment. We can get the id of the todo we want to delete from
  // req.params.id
  app.delete("/api/portfolio/:id", function(req, res) {
    db.Investment.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbInvestment) {
        res.json(dbInvestment);
    })
  });

  // PUT route for updating an investment. We can get the updated todo from req.body
  app.put("/api/portfolio", function(req, res) {
    db.Investment.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(function(dbInvestment) {
        res.json(dbInvestment);
    });
  });
};


// CostBasis