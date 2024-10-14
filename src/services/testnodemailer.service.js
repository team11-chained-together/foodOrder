import nodemailer from 'nodemailer';
export class TestNodeMailerService {
  constructor(transporter) {
    this.transporter = transporter;
  }
  testnodemailer = async (email) => {
    const generateRandomNumber = (min, max) => {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNum;
    };
    const number = generateRandomNumber(111111, 999999);
    req.session.number = number;
    const mailoption = await this.transporter.sendMail({
      from: 'foodOrder',
      to: email,
      subject: '인증번호를 보내드립니다.',
      text: `인증번호 : ${number}`,
    });

    return number;
  };
}
