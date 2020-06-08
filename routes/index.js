var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dice Roller' });
});

router.post('/', (req, res) => {
  //get string from user
  var userIn = req.body.userIn;

  //split into array by spaces
  var dice = userIn.split(" ");

  var resultArray = new Array();
  
  //loop though all inputs
  for (var i=0; i<dice.length; i++) {
    var die = dice[i];
    var resultString = die + ": ";
    //if input matches die string format, gen numbers
    if (die.match(/(\d+d\d+){1}/)) {
      var n = die.slice(0, die.indexOf('d'));
      var sides = die.slice(die.indexOf('d')+1);
      for (var j=0; j<n; j++) {
        resultString += Math.round(Math.random() * (sides - 1) + 1);
        if (j != n-1) {
          resultString += ", ";
        }
      }
      resultArray.push(resultString);
    }
    else resultArray.push(resultString + "Invalid input.");
  }

  res.render('index', {resultArray});
})

module.exports = router;