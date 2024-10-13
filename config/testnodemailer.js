import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const {user , pass } = process.env;
const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
          user: user,
          pass: pass,
        },
      });
export default transporter;