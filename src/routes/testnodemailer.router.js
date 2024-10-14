import express from 'express';
import { TestNodeMailerController } from '../controllers/testnodemailer.controller.js';
import { TestNodeMailerService } from '../services/testnodemailer.service.js';
import transporter from '../../config/testnodemailer.js';

const router = express.Router();

const testNodeMailerService = new TestNodeMailerService(transporter);
const testNodeMailerController = new TestNodeMailerController(testNodeMailerService);

router.post('/mail', testNodeMailerController.testnodemailer);

export default router;
