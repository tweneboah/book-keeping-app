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

//Popuplating this field of books to user s
UserSchema.virtual('books', {
  ref: 'Book',
  foreignField: 'createdBy',
  localField: '_id',
});
UserSchema.set('toJSON', { virtuals: true });
//=== END=======

//hashpassword
UserSchema.pre('save', async function (next) {
  //We only want to do this if the password is sent or modified, this is because when a user later update their password this will run and the user cannot login
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Verify password for login
//Methods: Apply to an instance of this model
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
