var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
