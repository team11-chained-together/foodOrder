export class StoreRankingRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getStoreRanking = async () => {
    const storeRanking = await this.prisma.store.findMany({
      orderBy: {
        sales: 'desc',
      },
    });
    return storeRanking;
  };
}
