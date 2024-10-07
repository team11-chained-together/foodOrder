import express from 'express';
import {userController} from '../controllers/user.controller.js';

const router = express.Router();
const usersController = new userController();

router.post('/signup',usersController.userSignup);
router.post('/login', usersController.userLogin);

export default router;