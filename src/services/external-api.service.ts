import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { Trip } from '../utils/validation';

dotenv.config();

export class ExternalApiService {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.API_URL || 'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips',
            headers: {
                'x-api-key': process.env.API_KEY
            }
        });
    }

    async fetchTrips(origin: string, destination: string): Promise<Trip[]> {
        try {
            const { data } = await this.client.get<Trip[]>('', {
                params: {
                    origin,
                    destination
                }
            });
            return data;
        } catch (error) {
            console.error('External API Service Error:', error);
            throw new Error('Failed to retrieve trip data from the external provider.');
        }
    }
}
