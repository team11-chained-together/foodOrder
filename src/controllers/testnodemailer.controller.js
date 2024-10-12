export class TestNodeMailerController {
    constructor(testNodeMailerService){
        this.testNodeMailerService = testNodeMailerService;
    }
    testnodemailer = async(req,res,next) =>{
        const {email} = req.body;
        const testnodemailer = await this.testNodeMailerService.testnodemailer(email);
        
        return res.status(200).json({testnodemailer});
    }
}