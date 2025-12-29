import { Trip } from '../utils/validation';
import { AppError } from '../exceptions/AppError';

export class TripStore {
    private trips: Trip[] = [];

    constructor() { }

    saveTrip(trip: Trip): Trip {
        const exists = this.trips.find(t => t.id === trip.id);
        if (exists) {
            throw new AppError('Trip with this ID already exists', 409);
        }
        this.trips.push(trip);
        return trip;
    }

    listTrips(): Trip[] {
        return this.trips;
    }

    deleteTrip(tripId: string): boolean {
        const initialLength = this.trips.length;
        this.trips = this.trips.filter(t => t.id !== tripId);
        return this.trips.length < initialLength;
    }
}
