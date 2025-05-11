// src/middleware/globalExceptionHandler.ts
import { ErrorRequestHandler } from 'express';
import { InvalidArgumentException } from '../exceptions/invalidArgumentException';
import { SeatNotAvailableException } from '../exceptions/seatNotAvailableException';

export const globalExceptionHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof InvalidArgumentException) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof SeatNotAvailableException) {
    res.status(409).json({ error: err.message });
    return;
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // Return generic error message for unhandled exceptions
  res.status(500).json({ error: 'Internal server error' });
};
