export class TestNodeMailerController {
  constructor(testNodeMailerService) {
    this.testNodeMailerService = testNodeMailerService;
  }
  testnodemailer = async (req, res) => {
    const { email } = req.body;
    const testnodemailer = await this.testNodeMailerService.testnodemailer(email);

    req.session.number = testnodemailer;
    return res.status(200).json({ testnodemailer });
  };
}
