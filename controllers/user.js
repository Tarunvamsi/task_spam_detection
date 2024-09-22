const db = require('../models');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { username, phoneNumber, password } = req.body;

    const user = await db.User.create({ username, phoneNumber, password });
    const token = generateToken(user);

    res.status(201).json({ token, username: user.username, phoneNumber: user.phoneNumber });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await db.User.findOne({ where: { phoneNumber } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, username: user.username, phoneNumber: user.phoneNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
