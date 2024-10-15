import express from 'express';
import { NodeMailerController } from '../controllers/nodemailer.controller.js';
import { NodeMailerService } from '../services/nodemailer.service.js';
import transporter from '../../config/nodemailer.js';

const router = express.Router();

const nodeMailerService = new NodeMailerService(transporter);
const nodeMailerController = new NodeMailerController(nodeMailerService);

router.post('/mail', nodeMailerController.nodemailer);

export default router;
