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
      return res.send(200);
    callBack(req, res);    
  }
  return updatedFunction;
}

var placesController = require('../controllers/placesController');
var authController = require('../controllers/userController');
var requestController = require('../controllers/requestController');

// place
router.post('/place/addNewPlace', auth, authFilter(placesController.addNewPlace));
router.post('/place/setIsFavourite', auth, authFilter(placesController.setIsFavourite));
router.get('/place/getAllFavouritePlaces', auth, authFilter(placesController.getAllFavouritePlaces));
router.get('/place/getAllPlaces', auth, authFilter(placesController.getAllPlaces));
router.post('/place/searchPlaces', auth, authFilter(placesController.searchPlaces));

//
router.post('/request/jsonRequest', auth, authFilter(requestController.jsonRequest));

// authentication
router.post('/user/register', authController.register);
router.post('/user/login', authController.login);

module.exports = router;
