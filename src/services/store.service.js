export class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  searchStores = async (search) => {
    const store = await this.storeRepository.searchStores(search);

    if (StoreService.length === 0) {
      throw new Error('검색 결과가 없습니다.');
    }

    return store.map((store) => ({
      storeId: store.storeId,
      userId: store.userId,
      storeName: store.storeName,
      location: store.location,
      foodType: store.foodType,
      sales: store.sales,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }));
  };

  createStore = async (userId, storeName, location, foodType) => {
    const store = await this.storeRepository.findStoreByUserId(userId);
    if (store) {
      throw new Error('이미 보유하고 있는 식당이 있습니다.');
    }

    const createdStore = await this.storeRepository.createStore(
      userId,
      storeName,
      location,
      foodType,
    );

    return {
      storeId: createdStore.storeId,
      userId: createdStore.userId,
      storeName: createdStore.storeName,
      location: createdStore.location,
      foodType: createdStore.foodType,
      sales: createdStore.sales,
      location: createdStore.location,
      createdAt: createdStore.createdAt,
      updatedAt: createdStore.updatedAt,
    };
  };

  updateStore = async (userId, storeName, foodType) => {
    const store = await this.storeRepository.findStoreByUserId(userId);
    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다, 식당을 만들어주세요.');
    }

    await this.storeRepository.updateStore(userId, storeName, foodType);

    const updatedStore = await this.storeRepository.findStoreByUserId(userId);

    return {
      userId: updatedStore.userId,
      storeId: updatedStore.storeId,
      storeName: updatedStore.storeName,
      foodType: updatedStore.foodType,
      sales: updatedStore.sales,
      createdAt: updatedStore.createdAt,
      updatedAt: updatedStore.updatedAt,
    };
  };

  deleteStore = async (userId, storeName) => {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다.');
    }

    await this.storeRepository.deleteStore(userId, storeName);

    return {
      storeId: store.storeId,
      storeName: store.storeName,
      foodType: store.foodType,
      sales: store.sales,
    };
  };

  getStore = async () => {
    const store = await this.storeRepository.findStore();

    return {
      store: store,
    };
  };
}
