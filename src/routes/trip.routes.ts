import { Router } from 'express';
import { TripController } from '../controllers/trip.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const tripController = new TripController();

router.get('/trips', asyncHandler(tripController.search));
router.post('/trips', asyncHandler(tripController.save));
router.get('/saved-trips', asyncHandler(tripController.listSaved));
router.delete('/saved-trips/:id', asyncHandler(tripController.deleteSaved));

export default router;
