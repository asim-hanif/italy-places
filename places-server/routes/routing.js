var router = require('express').Router();
const CONFIG = require('../config/config');
var jwt = require('express-jwt');

//for decoding jwt
var auth = jwt({
  secret: CONFIG.secretKey
});

var authFilter = (callBack) => {
  updatedFunction = (req , res) => {
    if(!req.user._id) 
      return res.status(200);
    callBack(req, res);    
  }
  return updatedFunction;
}

var placesController = require('../controllers/placesController');
var authController = require('../controllers/userController');

// place
router.post('/addNewPlace', auth, authFilter(placesController.addNewPlace));
router.post('/setIsFavourite', auth, authFilter(placesController.setIsFavourite));
router.get('/getAllFavouritePlaces', auth, authFilter(placesController.getAllFavouritePlaces));
router.get('/getAllPlaces', auth, authFilter(placesController.getAllPlaces));

// authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
