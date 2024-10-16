import { jest, test } from '@jest/globals';
import { NodeMailerService } from '../../../src/services/nodemailer.service.js';
import { transporter } from '../../../config/nodemailer.js';

const mockTransporter = {
  sendMail: jest.fn(),
};
const nodemailer = new NodeMailerService(transporter);
describe('노드메일러 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('노드메일러 성공 유닛 테스트', async () => {
    const sampleNodemailer = {
      from: 'foodOrder',
      to: 'test@test.com',
      subject: '인증번호를 보내드립니다.',
      text: `인증번호`,
    };
    mock.NodeMailerService.sendMail.mockReturnValue(sampleNodemailer);
    const sendNodemailData = await mockTransporter.sendMail('test@test.com');
    expect(sendNodemailData).toEqual(sampleNodemailer.to);
  });
});
