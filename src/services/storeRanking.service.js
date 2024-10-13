export class StoreRankingService {
  constructor(storeRankingRepository) {
    this.storeRankingRepository = storeRankingRepository;
  }

  getStoreRanking = async () => {
    const storeRanking = await this.storeRankingRepository.getStoreRanking();

    return {
      storeRanking: storeRanking,
    };
  };
}
