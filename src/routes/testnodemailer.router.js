import express from 'express';
import {TestNodeMailerController} from '../controllers/testnodemailer.controller.js';
// import {TestNodeMailerService} from '../services/testnodemailer.service.js';

const router = express.Router();

// const testNodeMailerService = new TestNodeMailerService();
const testNodeMailerController = new TestNodeMailerController(testNodeMailerService);

router.get('/mail',testNodeMailerController.testnodemailer);