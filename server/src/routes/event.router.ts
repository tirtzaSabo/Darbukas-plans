import express from 'express';
const router = express.Router();
import * as eventController from '../controllers/event.controller';
import { verifyToken } from '../middlewears/auth.middlewear';
import { authorizeRoles } from '../middlewears/authorizeRoles.middlewear';
router.get('/',verifyToken,authorizeRoles('user', 'admin'),eventController.getAllEvents);
router.get('/:id',verifyToken,authorizeRoles('user', 'admin'), eventController.getEventById);
router.post('/',verifyToken,authorizeRoles('user', 'admin'), eventController.createEvent);
router.put('/:id',verifyToken,authorizeRoles('admin'), eventController.updateEvent);
router.delete('/:id',verifyToken,authorizeRoles( 'admin'), eventController.deleteEvent);

export default router;
