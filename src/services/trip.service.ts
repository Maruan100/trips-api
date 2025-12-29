import { ExternalApiService } from './external-api.service';
import { Trip, TripSearchQuery } from '../utils/validation';

export class TripService {
    private externalApiService: ExternalApiService;

    constructor(externalApiService: ExternalApiService = new ExternalApiService()) {
        this.externalApiService = externalApiService;
    }

    async searchTrips(query: TripSearchQuery): Promise<Trip[]> {
        const trips = await this.externalApiService.fetchTrips(query.origin, query.destination);

        return this.sortTrips(trips, query.sort_by);
    }

    private sortTrips(trips: Trip[], strategy: 'fastest' | 'cheapest'): Trip[] {
        const comparators: Record<string, (a: Trip, b: Trip) => number> = {
            fastest: (a, b) => a.duration - b.duration,
            cheapest: (a, b) => a.cost - b.cost,
        };

        const sortFn = comparators[strategy];

        return [...trips].sort(sortFn);
    }
}
