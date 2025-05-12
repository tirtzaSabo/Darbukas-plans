import express from 'express';
const router = express.Router();
import * as serviceController from '../controllers/services.controller';
import { verifyToken } from '../middlewears/auth.middlewear';

router.get('/',verifyToken, serviceController.getAllServices);
router.get('/:id',verifyToken, serviceController.getServiceById);
router.post('/',verifyToken, serviceController.createService);
router.put('/:id',verifyToken, serviceController.updateService);
router.delete('/:id',verifyToken, serviceController.deleteService);

export default router;
