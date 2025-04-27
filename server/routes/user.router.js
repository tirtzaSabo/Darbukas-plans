const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/bytoken',userController.getUserFromToken)
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
