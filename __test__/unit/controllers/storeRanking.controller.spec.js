import {jest,test} from '@jest/globals';
import {StoreRankingController} from '../../../src/controllers/storeRanking.controller.js'

const mockStoreRankingService = {
    getStoreRanking : jest.fn()
}

const mockNext = jest.fn();


describe('스토어 랭킹 컨트롤러 유닛 테스트', () =>{
    const storeRankingController = new StoreRankingController(mockStoreRankingService);
    
    const mockRequest ={}

    const mockResponse = {
        json : jest.fn(),
        status : jest.fn()
    }
    
    beforeEach(()=>{
        jest.resetAllMocks();

        mockResponse.status.mockReturnValue(mockResponse);
    });

    test('스토어 매출순 랭킹 확인 성공 유닛 테스트' , async()=>{

        const getStoreRankingReturnValue = {
            storeRanking:{"kfc":1},
        }
        mockStoreRankingService.getStoreRanking.mockReturnValue(getStoreRankingReturnValue);
        await storeRankingController.getStoreRanking(mockRequest,mockResponse,mockNext)
        expect(mockStoreRankingService.getStoreRanking).toHaveBeenCalledTimes(1);
        expect(mockStoreRankingService.getStoreRanking).toHaveBeenCalledWith();

        expect(mockResponse.status).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)

        expect(mockResponse.json).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).toHaveBeenCalledWith(
            getStoreRankingReturnValue)
    })
})