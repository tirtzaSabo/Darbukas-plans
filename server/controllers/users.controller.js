// const { Router } = require('express');
// const app = Router();
// const fs = require('fs').promises;
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models/user');
// const userModel = require('../models/userModel');
// const userService = require('../services/user.service')

// let Users = async function () {


//     app.post("/signup", async (req, res) => { userService.addUser(req, res) })

//     app.post("/signin", async (req, res) => {
//         userService.signin(req, res)
//     });
//     app.get("/", async (req, res) => {
//         userService.getAllUsers(req, res)
//     });
// }
const User = require('../models/User'); // Assuming your user model is defined in models/User.js

const userService = require('../services/userService');

// Controller methods for User CRUD operations
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
    const newUser = await userService.signup(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.signin = async (req, res) => {
  try {
    const newUser = await userService.signin(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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



