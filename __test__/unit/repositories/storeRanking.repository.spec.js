import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { StoreRankingRepository } from '../../../src/repositories/storeRanking.repository';

let mockPrisma = {
  store: {
    findMany: jest.fn(),
  },
};

let storeRankingRepository = new StoreRankingRepository(mockPrisma);

describe('가게 랭킹 리포지토리 유닛 테스트', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('가게 랭킹 조회 메서드 테스트 성공', async () => {
    const mockReturn = 'get Store Ranking Test';
    mockPrisma.store.findMany.mockReturnValue(mockReturn);
    const getStoreRanking = await storeRankingRepository.getStoreRanking();

    expect(getStoreRanking).toEqual(mockReturn);
    expect(mockPrisma.store.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrisma.store.findMany).toHaveBeenCalledWith({
      orderBy: {
        sales: 'desc',
      },
    });
  });
});
