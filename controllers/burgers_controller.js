var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// Create all our routes and set up logic within those routes where required.
router.get("/burgers", function(req, res) {
  burger.all(function(dbResults) {
    /* var data = {
      burgers: dbResults
    }; */
    res.render("index", {burgers: dbResults});
  });
});

router.post("/burgers/create", function(req, res) {
  burger.create(req.body.burger_name, function(result) {
    //console.log("created new burger")
    console.log(result)
    res.redicrect("/");
  });
});

router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

/* router.delete("/api/burgers", function(req, res) {
  var condition = "id = " + req.paramas.id
  console.log("condition", condition)
  burger.delete({
    
  })
}) */

// Export routes for server.js to use.
module.exports = router;