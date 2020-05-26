var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Die Roller' });
});

router.post('/', function(req, res) {
  var dies = req.body.diestr.split(' ');
  var rolls = dies.map((die) => {
    var num = parseInt(die.slice(0, die.indexOf('d')));
    var max = parseInt(die.slice(die.indexOf('d')+1));
    var result = '';
    for (var i = 0; i < num; i++) {
      result += Math.floor(Math.random() * (max - 1) + 1);
      if (i != num-1) {
        result += ", ";
      }
    } 
    return result
  });

  res.render('index', {rolls: rolls});
})

module.exports = router;