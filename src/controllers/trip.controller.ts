import { Request, Response } from 'express';
import { TripService } from '../services/trip.service';
import { TripSearchSchema, TripSchema } from '../utils/validation';
import { TripStore } from '../store/trip.store';
import { AppError } from '../exceptions/AppError';

export class TripController {
    private tripService: TripService;
    private tripStore: TripStore;

    constructor() {
        this.tripService = new TripService();
        this.tripStore = new TripStore();
    }

    search = async (req: Request, res: Response) => {
        const validationResult = TripSearchSchema.safeParse(req.query);

        if (!validationResult.success) {
            throw new AppError('Invalid parameters: ' + JSON.stringify(validationResult.error.errors), 400);
        }

        const trips = await this.tripService.searchTrips(validationResult.data);
        return res.json(trips);
    };

    save = async (req: Request, res: Response) => {
        const validationResult = TripSchema.safeParse(req.body);

        if (!validationResult.success) {
            throw new AppError('Invalid trip data', 400);
        }

        const savedTrip = this.tripStore.saveTrip(validationResult.data);
        return res.status(201).json(savedTrip);
    };

    listSaved = async (req: Request, res: Response) => {
        const trips = this.tripStore.listTrips();
        return res.json(trips);
    };

    deleteSaved = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new AppError('Trip ID is required', 400);
        }

        const deleted = this.tripStore.deleteTrip(id);
        if (!deleted) {
            throw new AppError('Trip not found', 404);
        }

        return res.json({ message: 'Trip deleted successfully' });
    };
}
