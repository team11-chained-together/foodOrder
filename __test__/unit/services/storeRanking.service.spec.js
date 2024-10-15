import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreRankingService } from '../../../src/services/storeRanking.service.js';

describe('StoreRankingService 유닛 테스트', () => {
  let storeRankingService;
  let mockStoreRankingRepository;

  beforeEach(() => {
    mockStoreRankingRepository = {
      getStoreRanking: jest.fn(),
    };

    storeRankingService = new StoreRankingService(mockStoreRankingRepository);
    jest.resetAllMocks();
  });

  test('스토어 랭킹 데이터를 성공적으로 가져오는 테스트', async () => {
    const storeRankingData = {
      Test: 1,
      Test1: 2,
      Test3: 3,
    };

    mockStoreRankingRepository.getStoreRanking.mockResolvedValue(storeRankingData);

    const storedRanking = await storeRankingService.getStoreRanking();

    expect(mockStoreRankingRepository.getStoreRanking).toHaveBeenCalledTimes(1);
    expect(storedRanking).toEqual({
      storeRanking: storeRankingData,
    });
  });
});
