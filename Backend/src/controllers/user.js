const User = require('../model/user');
const { sendOTP ,genOTP } = require('../utils/SendEmail');

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });
  if (!user || !(await user.comparePassword(Password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.user = user;
  res.status(200).json({msg: "Login successful",user });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.json({ msg: 'Logged out' });
};

exports.getSession = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'No session' });
  }
};

exports.sendOtp = async (req, res) => {
  const { Email } = req.body;
  const user = await User.findOne({ Email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const otp = genOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOTP(Email, otp);
  res.json({ msg: 'OTP sent' });
};

exports.forgotPassword = async (req, res) => {
  const { Email, Username, OTP, Password } = req.body;
  const user = await User.findOne({ Email });

  if (!user || user.otp !== OTP || user.otpExpiry < Date.now()) {
    return res.status(400).json({ msg: 'Invalid OTP or expired' });
  }

  user.Password = Password;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({ msg: 'Password reset successful' });
};
