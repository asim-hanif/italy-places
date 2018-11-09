var mongoose = require('mongoose');
var dbURI = 'mongodb://@ds259250.mlab.com:59250/italy-places';

mongoose.connect(dbURI, {
    auth: {
      user: 'xgridUser',
      password: 'mLab@xgrid123'
    },
    useNewUrlParser: true 
  })
require('./user');
require('./place');