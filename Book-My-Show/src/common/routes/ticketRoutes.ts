// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';
import { TicketService } from '../services/ticketService';
import { AppDataSource } from '../../config/database';

const router = Router();
const ticketService = new TicketService(AppDataSource);
const ticketController = new TicketController(ticketService);

// POST /api/tickets - Book a ticket
router.post('/', (req, res) => ticketController.bookTicket(req, res));

export default router;
