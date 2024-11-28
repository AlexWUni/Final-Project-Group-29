var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');



/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);


// Get router for login page
router.get('/login',indexController.displayLoginPage);
//post router for login page
router.post('/login',indexController.processLoginPage);
// Get router for registration page
router.get('/register',indexController.displayRegisterPage);
//post router for registration page
router.post('/register',indexController.processRegisterPage);
// Get router for logout page
router.get('/logout',indexController.performLogout);

module.exports = router;

