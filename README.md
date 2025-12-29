# Trip Planner API

A Node.js API to search for flights and manage trips.

## Features
- Search trips from an origin to a destination.
- Sort results by 'fastest' or 'cheapest'.
- Manage saved trips (save, list, delete) [In-memory].

## Prerequisites
- Node.js (v14 or higher)
- npm

## Setup
1. Clone the repository (or unzip the project).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables creating a `.env`:
   ```
   PORT=3000
   API_KEY=your_api_key_here
   API_URL=your_api_url_here
   ```

## Running the Application
### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Testing
Run the unit/integration tests:
```bash
npm test
```

## API Endpoints

### Search Trips
- **URL**: `GET /api/trips`
- **Query Params**:
  - `origin`: 3-letter IATA code (e.g., SYD)
  - `destination`: 3-letter IATA code (e.g., GRU)
  - `sort_by`: `fastest` | `cheapest`
- **Example**:
  ```
  GET /api/trips?origin=SYD&destination=GRU&sort_by=cheapest
  ```

### Save Trip
- **URL**: `POST /api/trips`
- **Body**: Trip object
- **Response**: Saved Trip object

### List Saved Trips
- **URL**: `GET /api/saved-trips`
- **Response**: Array of saved Trip objects

### Delete Trip
- **URL**: `DELETE /api/saved-trips/:id`
- **Response**: Success message
