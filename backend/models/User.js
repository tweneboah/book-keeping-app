const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

//Hash password
UserSchema.pre('save', async function (next) {
  //create salt
  const salt = await bcrypt.genSalt(10);
  //hash password
  this.password = await bcrypt.hash(this.password, salt);
});

//Verify password for login
//Methods: Apply to an instance of this model
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
