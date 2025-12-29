import { z } from 'zod';

export const TripSearchSchema = z.object({
    origin: z.string().length(3).regex(/^[A-Z]{3}$/, 'Must be a 3-letter IATA code'),
    destination: z.string().length(3).regex(/^[A-Z]{3}$/, 'Must be a 3-letter IATA code'),
    sort_by: z.enum(['fastest', 'cheapest'])
});

export const TripSchema = z.object({
    origin: z.string(),
    destination: z.string(),
    cost: z.number(),
    duration: z.number(),
    type: z.string(),
    id: z.string(),
    display_name: z.string()
});

export type TripSearchQuery = z.infer<typeof TripSearchSchema>;
export type Trip = z.infer<typeof TripSchema>;
