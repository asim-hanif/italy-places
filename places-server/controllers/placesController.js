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
    place.isFavourite = true;

    place.save((err, data) => {
        if (!err)
            res.send(data);
        else
            res.status(500);
    });

};

function setIsFavourite(req, res) {
    let userId = req.user._id,
        placeId = req.body.placeId,
        isFavourite = req.body.isFavourite;

    let qry = { userId: userId, _id: placeId, };

    Place.update(qry, { $set: { isFavourite: isFavourite } }, (err, place) => {
        if (err)
            res.send(500);
        else
            res.send(200);
    });

};

function getAllPlaces(req, res) {
    let userId = req.user._id;
    let qry = { userId: userId };
    Place.find(qry, (err, allPlaces) => {
        if (err)
            res.send(500);
        else
            res.status(200).json(allPlaces);
    });
};

function getAllFavouritePlaces(req, res) {
    let userId = req.user._id;
    let qry = { userId: userId, isFavourite: true };
    Place.find(qry, (err, favouritePlaces) => {
        if (err)
            res.send(500);
        else
            res.status(200).json(favouritePlaces);
    });
};

function searchPlaces(req, res) {
    let userId = req.user._id,
        searchText = req.body.searchText;
    let qry = {
        userId: userId,
        $or: [
            { name: new RegExp('.*' + searchText + '.*', "i") },
            { address: new RegExp('.*' + searchText + '.*', "i") },
            { type: new RegExp('.*' + searchText + '.*', "i") }
        ]
    };
    Place.find(qry, (err, places) => {
        if (err)
            res.sendStatus(500);
        else
            res.status(200).json(places);
    });
};

module.exports.addNewPlace = addNewPlace;
module.exports.setIsFavourite = setIsFavourite;
module.exports.getAllPlaces = getAllPlaces;
module.exports.getAllFavouritePlaces = getAllFavouritePlaces;
module.exports.searchPlaces = searchPlaces;