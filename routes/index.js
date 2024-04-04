var express = require('express');
const { route } = require('./services');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.send('Wealcom to home page.');
});

 router.use('/services',require('./services'));
 router.use('/typeservices', require('./typeservices'));

 router.use('/staffs',require('./staffs'));
 router.use('/roles', require('./roles'));

 router.use('/clients',require('./clients'));

 router.use('/auth',require('./auth'));
 router.use('/authstaff', require('./authStaff'));

 router.use('/users', require('./users'));

module.exports = router;
