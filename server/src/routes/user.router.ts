import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller';
import { verifyToken } from '../middlewears/auth.middlewear';
import { authorizeRoles } from '../middlewears/authorizeRoles.middlewear';
router.get('/',verifyToken,authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id',verifyToken, userController.getUserById);
router.post('/bytoken',verifyToken,userController.getUserFromToken)
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout',verifyToken, userController.logout);
router.put('/:id',verifyToken, userController.updateUser);
router.delete('/:id',verifyToken, userController.deleteUser);

export default router;
