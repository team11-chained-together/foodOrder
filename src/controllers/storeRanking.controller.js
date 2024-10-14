export class StoreRankingController {
  constructor(storeRankingService) {
    this.storeRankingService = storeRankingService;
  }

  getStoreRanking = async (req, res, next) => {
    try {
      const storeRanking = await this.storeRankingService.getStoreRanking();

      return res.status(200).json({ storeRanking });
    } catch (err) {
      next(err);
    }
  };
}
