import expressSession from 'express-session';

export class TestNodeMailerController {
  constructor(testNodeMailerService) {
    this.testNodeMailerService = testNodeMailerService;
  }
  testnodemailer = async (req, res) => {
    const { email } = req.body;
    const testNodemailer = await this.testNodeMailerService.testNodemailer(email);
    req.session.emailCode = testNodemailer;
    return res.status(200).json({ data: testNodemailer });
  };
}
