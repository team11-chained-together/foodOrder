import expressSession from 'express-session';
import { NodeMailerValidator } from '../utils/validators/nodeMailerValidator.js';

export class NodeMailerController {
  constructor(nodeMailerService) {
    this.nodeMailerService = nodeMailerService;
  }

  nodemailer = async (req, res) => {
    const nodemailerValidator = new NodeMailerValidator(req.body);
    nodemailerValidator.validate();

    const nodemailer = await this.nodeMailerService.nodemailer(nodemailerValidator.email);
    req.session.emailCode = nodemailer;
    return res.status(200).json({ data: nodemailer });
  };
}
