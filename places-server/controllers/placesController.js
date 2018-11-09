var mongoose = require('mongoose');
var Place = mongoose.model('Place');

function addNewPlace(req, res) {
  let userId = req.user._id;
  let { name, address, telephoneNo, type, isFavourite } = req.body;
  
  var place = new Place();
  place.userId = userId;
  place.name = name;
  place.address = address;
  place.telephoneNo = telephoneNo;
  place.type = type;
  place.isFavourite = isFavourite;

  place.save((err) => {
    if(!err)    
        res.status(200);
    else
        res.status(500);
  });

};

function setIsFavourite(req, res) {
    let userId = req.user._id,
        placeId = req.placeId,
        isFavourite = req.isFavourite;

    let qry = { userId: userId, _id: placeId,};

    Place.find(qry, (err, place) => {
        if(err) return res.status(500);

        place.isFavourite = isFavourite;
  
        place.save(function(err) {
          if(!err)    
              res.status(200);
          else
              res.status(500);
        });
    }); 
  
  };

function getAllPlaces(req, res) {
    let userId = req.user._id;
    let qry = {userId: userId};
    Place.find(qry, (err, allPlaces) => {
        if(err) 
            res.status(500);
        else
            res.status(200).json(allPlaces);
    });
};

function getAllFavouritePlaces(req, res) {
    let userId = req.user._id;
    let qry = {userId: userId, isFavourite: true};
    Place.find(qry, (err , favouritePlaces) => {
        if(err) 
            res.status(500);
        else
            res.status(200).json(favouritePlaces);
    });     
};

module.exports.addNewPlace = addNewPlace;
module.exports.setIsFavourite = setIsFavourite;
module.exports.getAllPlaces = getAllPlaces;
module.exports.getAllFavouritePlaces = getAllFavouritePlaces;