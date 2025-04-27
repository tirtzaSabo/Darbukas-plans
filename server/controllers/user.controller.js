const User = require('../models/user.model');
const userService = require('../services/user.service');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const newUser = await userService.signup(req, res);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};
exports.signin = async (req, res) => {
  try {
    const newUser = await userService.signin(req, res);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.logout = async (req, res) => {
  try {
    await userService.logout(req, res);
  } catch (err) {
    console.log(err);

  }
};
exports.getUserFromToken = async (req, res) => {
  try {
    await userService.getUserFromToken(req, res);

  } catch (error) {
    console.log(error);

  }
}
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



