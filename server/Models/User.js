const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype:{type:String,enum:['user','admin'],default:'user'},
  token:{type:String},
  photo: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
