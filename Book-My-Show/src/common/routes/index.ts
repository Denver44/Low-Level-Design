// src/routes/index.ts
import { Router } from 'express';
import ticketRoutes from './ticketRoutes';

const router = Router();

router.use('/tickets', ticketRoutes);
// Add other routes as needed

export default router;
