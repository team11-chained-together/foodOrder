import {jest,test} from '@jest/globals';
import {NodeMailerController} from '../../../src/controllers/nodemailer.controller.js';
import {TestNodValidator} from '../../../src/utils/validators/testnodeMailerValidator.js'

const mockNodemailerService = {
    NodeMailerValidator : jest.fn()
};

const mockNext = jest.fn();

describe('노드메일러 컨트롤러 유닛 테스트', ()=>{
    const nodeMailerController = new NodeMailerController(mockNodemailerService)
    

    const mockRequest = {
        body:{},
    }

    const mockResponse = {
        status:jest.fn(),
        json : jest.fn()
    }

    beforeEach(() =>{
        jest.resetAllMocks();
        mockResponse.status.mockReturnValue(mockResponse);
    });

    test('노드메일러 메일 전송 컨트롤러 유닛 테스트' ,async () =>{
        new TestNodValidator(mockRequest.body)
        const nodemailerBodyParams = {
            email : "test@test.com"
        };
        mockRequest.body = nodemailerBodyParams;

        const nodemailerReturnValue = {
            number : 1234,
        }
        mockNodemailerService.NodeMailerValidator.mockReturnValue(nodemailerReturnValue)

        await nodeMailerController.nodemailer(mockRequest,mockResponse,mockRequest);
        expect(mockNodemailerService.NodeMailerValidator).toHaveBeenCalledTimes(1);
        expect(mockNodemailerService.NodeMailerValidator).toHaveBeenCalledWith(
            nodemailerBodyParams.email
        )

        expect(mockResponse.status).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)

        expect(mockResponse.json).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).toHaveBeenCalledWith({
            data:nodemailerReturnValue
        })
    })
})