import { z } from 'zod';

export const SUPPORTED_IATA_CODES = [
    "ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW",
    "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO",
    "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO",
    "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM",
    "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"
] as const;

export const TripSearchSchema = z.object({
    origin: z.enum(SUPPORTED_IATA_CODES, {
        errorMap: () => ({ message: 'Origin must be one of the supported IATA codes' })
    }),
    destination: z.enum(SUPPORTED_IATA_CODES, {
        errorMap: () => ({ message: 'Destination must be one of the supported IATA codes' })
    }),
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
