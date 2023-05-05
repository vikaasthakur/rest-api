const userModal = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existinguser = await userModal.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: 'user already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModal.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await userModal.findOne({ email: email });
    if (!existinguser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const matchPassword = await bcrypt.compare(password, existinguser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existinguser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { SignIn, SignUp };
