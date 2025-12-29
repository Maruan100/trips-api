import request from 'supertest';
import { mockTrips } from './fixtures/trips';

jest.mock('../src/services/external-api.service', () => {
    return require('./mocks/external-api.service');
});

import app from '../src/app';

describe('Trip API', () => {

    describe('GET /api/trips', () => {
        it('should return trips sorted by fastest', async () => {
            const response = await request(app).get('/api/trips?origin=SYD&destination=GRU&sort_by=fastest');
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe('3');
            expect(response.body[1].id).toBe('1');
            expect(response.body[2].id).toBe('2');
        });

        it('should return trips sorted by cheapest', async () => {
            const response = await request(app).get('/api/trips?origin=SYD&destination=GRU&sort_by=cheapest');
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe('2');
            expect(response.body[1].id).toBe('3');
            expect(response.body[2].id).toBe('1');
        });

        it('should return 400 for invalid parameters', async () => {
            const response = await request(app).get('/api/trips?origin=SY&destination=GRU&sort_by=fastest');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/trips', () => {
        it('should save a trip', async () => {
            const tripToSave = mockTrips[0];
            const response = await request(app).post('/api/trips').send(tripToSave);
            expect(response.status).toBe(201);
            expect(response.body.id).toBe(tripToSave.id);
        });

        it('should return 409 if trip ID already exists', async () => {
            const tripToSave = mockTrips[0];
            await request(app).post('/api/trips').send(tripToSave);

            const response = await request(app).post('/api/trips').send(tripToSave);
            expect(response.status).toBe(409);
            expect(response.body.message).toContain('already exists');
        });
    });

    describe('GET /api/saved-trips', () => {
        beforeAll(async () => {
            await request(app).post('/api/trips').send(mockTrips[0]);
        });

        it('should list saved trips', async () => {
            const response = await request(app).get('/api/saved-trips');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('DELETE /api/saved-trips/:id', () => {
        let savedTripId: string;

        beforeEach(async () => {
            const tripToSave = { ...mockTrips[0], id: 'unique-id-for-delete-test' };
            const response = await request(app).post('/api/trips').send(tripToSave);
            savedTripId = response.body.id;
        });

        it('should delete a saved trip', async () => {
            const response = await request(app).delete(`/api/saved-trips/${savedTripId}`);
            expect(response.status).toBe(200);
        });
    });
});
