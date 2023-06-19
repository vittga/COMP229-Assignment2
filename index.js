var express = require('express');
var router = express.Router();
let indexController = require('./controllers/index');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home'});
// });

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

 router.get('/login', indexController.displayLoginPage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);
 
/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

// Get Route for displaying the login page
// router.get('/login', function(req, res, next) {
//   res.render('auth/login', { title: 'Login'});
// });

// // Get Route for displaying the login page
router.get('/login', indexController.displayLoginPage);

// // Post Route for processing the login page
router.post('/login', indexController.processLoginPage);

// // Get Route for displaying the register page
router.get('/register', indexController.displayRegisterPage);

// // Post Route for processing the login page
router.post('/register', indexController.processRegisterPage);

// // Get Route for performing UserLogout
router.get('/logout', indexController.performLogout);

module.exports = router;
