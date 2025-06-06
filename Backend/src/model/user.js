const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Username: String,
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  otp: String,
  otpExpiry: Date,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();
  this.Password = await bcrypt.hash(this.Password, 12);
  next();
});

UserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.Password);
};

module.exports = mongoose.model('User', UserSchema);
