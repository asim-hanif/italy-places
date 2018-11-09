var mongoose = require( 'mongoose' );

var PlaceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  telephoneNo: String,
  type: String,
  isFavourite: Boolean,
});

mongoose.model('Place', PlaceSchema);
