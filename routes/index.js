var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("incoming request from: " + req.headers['user-agent']);
  res.render('index', { title: 'My cool Site' });
});

router.get('/test', function(req, res, next) {
  res.status(418);
  res.send("This is a test");
});

router.get('/test/toast', function(req, res, next) {
  res.status(500);
  res.send("There was an unexpected error.");
});

router.post('/test', function(req, res, next) {
  console.log(req.body);
  res.send(req.body.message);
});

var data = [
  "Jesse",
  "Sarah",
  "Ashton"
];

router.get('/profile/:id/:test', function(req, res, next) {
  console.log("the params are: ", req.params);

  var requestedItem = "";
  res.status(500);

  if (req.params.id <= data.length -1) {
    res.status(200)
    requestedItem = data[req.params.id];
  }

  res.send(requestedItem);
});

module.exports = router;
