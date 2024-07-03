const { Router } = require('express');
const app = Router();
const fs = require('fs').promises;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const userModel = require('../models/userModel');
const userService = require('../services/user.service')

let Users = async function () {


    app.post("/signup", async (req, res) => { userService.addUser(req, res) })



    app.post("/signin", async (req, res) => {
        userService.signin(req, res)
    });

}
Users();
module.exports = app;