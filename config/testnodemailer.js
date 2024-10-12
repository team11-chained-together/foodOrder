import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: 'coconarooroo@gmail.com',
      pass: 'vjrb vbow xwas ugyz',
    },
  });
export default transporter;