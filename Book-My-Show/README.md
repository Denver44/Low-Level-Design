# BookMyShow Clone

A robust movie ticket booking system built with TypeScript, Express, and TypeORM.

## Features

- User registration and authentication
- Browse movies, theaters, and shows
- Seat selection and booking
- Ticket management
- Payment processing (placeholder)

## Technical Features

- Clean architecture with separation of concerns
- Transaction management for data consistency
- Pessimistic locking to prevent concurrent bookings
- Custom exception handling
- Strategy pattern for pricing calculation
- RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookmyshow-clone.git
   cd bookmyshow-clone
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   # Create a .env file with the following:
   PORT=3000
   HOST=localhost
   NODE_ENV=development
   CORS_ORIGIN=*

   # Database config
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   DB_NAME=bookmyshow
   ```

4. Start the development server:

   ```bash
   pnpm start:dev
   ```

## API Endpoints

- `POST /api/tickets` - Book a ticket
- `GET /api/tickets/:id` - Get ticket details
- `GET /api/shows` - Get list of shows
- `GET /api/shows/:id/seats` - Get available seats for a show

## Future Enhancements

- Payment gateway integration
- Caching with Redis
- Microservices architecture
- Advanced security with JWT
- Push notifications for booking confirmations

---

These final code changes complete your BookMyShow implementation with:

1. Proper exception handling using a global exception handler
2. A flexible pricing strategy pattern
3. Robust transaction management and pessimistic locking
4. Clean architecture with separation of concerns
5. Documentation for future enhancements

This implementation follows the best practices described throughout all the notes while adapting them to TypeScript, Express, and TypeORM.
