var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Die Roller' });
});

router.post('/', [
  check('diestr').notEmpty().withMessage("Please enter a string.")
  .matches(/^(\d+d\d+\s+)*$/g).withMessage("Please use the format listed above.")
], (req, res) => {
  var errors = validationResult(req);
  var hasErrors = false;
  var resultArray;
  if (errors.isEmpty()) {
    var dies = req.body.diestr.split(' ');
    var resultArray = dies.map((die) => {
      var num = parseInt(die.slice(0, die.indexOf('d')));
      var max = parseInt(die.slice(die.indexOf('d')+1));
      var resultString = '';
      for (var i = 0; i < num; i++) {
        resultString += Math.floor(Math.random() * (max - 1) + 1);
        if (i != num-1) {
          resultString += ", ";
        }
      } 
      return resultString;
    })
  } else {
    hasErrors = true;
    resultArray = errors.array();
  }
  res.render('index', {hasErrors: hasErrors, resultArray: resultArray});
})

module.exports = router;