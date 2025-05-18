import express from 'express';
const router = express.Router();
import * as EventTypeController from '../controllers/eventType.controller';
import { verifyToken } from '../middlewears/auth.middlewear';

router.get('/',verifyToken, EventTypeController.getAllEventTypes);
router.get('/:id',verifyToken, EventTypeController.getEventTypeById);
router.post('/',verifyToken, EventTypeController.createEventType);
router.put('/:id',verifyToken, EventTypeController.updateEventType);
router.delete('/:id',verifyToken, EventTypeController.deleteEventType);

export default router;
