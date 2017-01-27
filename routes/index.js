var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Watson Feedback Board' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: "Test Title" })
});

module.exports = router;
