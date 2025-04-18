# API Server - User Data Transformer

This project fetches user data from the DummyJSON API and transforms it by grouping users by department.

## Features

- Fetches user data from https://dummyjson.com/users
- Transforms data to group users by department
- Calculates gender counts, age ranges, hair color summaries, and address mappings
- Optimized for performance
- Includes comprehensive tests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. The server will start at http://localhost:3001

## API Endpoints

### GET /api/summary

Returns user data grouped by department with the following structure:

```json
{
  "[Department]": {
    "male": 1,                      // Male Count Summary
    "female": 1,                    // Female Count Summary
    "ageRange": "XX-XX",            // Age Range
    "hair": {                       // Hair Color Summary
      "Black": 1,                
      "Blond": 1,
      "Chestnut": 1,
      "Brown": 1
    },
    "addressUser": {                // User Address Mapping
      "FirstNameLastName": "XXXXX", // Format: firstName + lastName: postalCode
    }
  }
}
```

## Testing

Run the tests:

```bash
npm test
```

The test suite includes:
- Unit tests for the transformer function
- Tests for edge cases
- Performance tests with larger datasets

## Performance Considerations

The transformer function is optimized for performance in several ways:
1. Uses Map for faster lookups when grouping by department
2. Tracks min/max age during iteration instead of using Math.min/max on arrays
3. Processes all data in a single pass
4. Uses proper TypeScript types for better type safety

## Build for Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```
