import nodemailer from 'nodemailer';
import testnodemailer from '../config/testnodemailer.json'

// 메일발송 객체
const mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    const transporter = nodemailer.createTransport({
      service: 'naver',   // 메일 보내는 곳
      prot: 587,
      host: 'smtp.naver.com',  
      secure: false,  
      requireTLS: true ,
      auth: {
        user: testnodemailer.user,  // 보내는 메일의 주소
        pass: testnodemailer.pass   // 보내는 메일의 비밀번호
      }
    });
    // 메일 옵션
    var mailOptions = {
      from: testnodemailer.user, // 보내는 메일의 주소
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text // 메일 내용
    };
    
    // 메일 발송    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
}

export default mailSender;