export class StoreRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createStore = async (storeName, foodType) => {
    const createdStore = await this.prisma.stores.create({
      data: {
        storeName: storeName,
        foodType: foodType,
      },
    });

    return createdStore;
  };
}
