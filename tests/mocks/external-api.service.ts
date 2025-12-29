import { mockTrips } from '../fixtures/trips';

export class ExternalApiService {
    async fetchTrips(origin: string, destination: string) {
        return Promise.resolve(mockTrips);
    }
}
