import {jest,test} from '@jest/globals';
import{UserOrderController} from '../../../src/controllers/userOrder.controller.js';
import{UserOrderValidation} from '../../../src/utils/validators/controller/userOrderValidator.js'

const mockUserOrderService = {
    createUserOrder : jest.fn(),
}

const mockRequest ={
    body : {},
    user : {}
}

const mockResponse = {
    status : jest.fn(),
    json : jest.fn()
}

const mockNext = jest.fn();

const userOrderController = new UserOrderController(mockUserOrderService);
new UserOrderValidation(mockRequest.body)

describe('유저 오더 컨트롤러 유닛 테스트', ()=>{
    beforeEach(()=>{
        jest.resetAllMocks();

        mockResponse.status.mockReturnValue(mockResponse);
    });

    test('유저 오더 생성 성공 유닛 테스트', async()=>{
        const createUserOrderBodyParams = {
        storeId : 1,
        menuId : 1,
        quantity: 10,
        }
        mockRequest.body = createUserOrderBodyParams;
        mockRequest.user = { userId: 1, isOwner: true };

        const createUserOrderReturnValue ={
            orderId:1,
            userId:1,
            statement :"PREPARE",
            storeId :1,
            createdAt: new Date().toString(),
            orderMenu:1,
        }
        mockUserOrderService.createUserOrder.mockReturnValue(createUserOrderReturnValue);
        await userOrderController.createUserOrder(mockRequest,mockResponse,mockNext)
        expect(mockUserOrderService.createUserOrder).toHaveBeenCalledTimes(1)
        expect(mockUserOrderService.createUserOrder).toHaveBeenCalledWith(
            mockRequest.user.userId,
            createUserOrderBodyParams.storeId,
            createUserOrderBodyParams.menuId,
            createUserOrderBodyParams.quantity
        )

        expect(mockResponse.status).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(201);

        expect(mockResponse.json).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).toHaveBeenCalledWith({
            data:createUserOrderReturnValue
        })
    })
})