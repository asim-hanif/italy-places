var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  telephoneNo: String,
  type: String,
  isFavourite: Boolean,
});
PlaceSchema.index({ address: 1, type: 1, name: 1 })
mongoose.model('Place', PlaceSchema);
