let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = new Schema({
    name:  String,
    time: String,
    
  });
module.exports = mongoose.model('Users', users)