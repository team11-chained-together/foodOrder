export class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  searchStores = async (search) => {
    const menu = await this.storeRepository.searchMenu(search);
    console.log(search);
    console.log(menu);
    console.log(menu.storeId);
    const store = await this.storeRepository.searchStores(search, menu.storeId);

    if (store.length === 0) {
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
      createdAt: createdStore.createdAt,
      updatedAt: createdStore.updatedAt,
    };
  };

  updateStore = async (userId, storeName, foodType, location) => {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다, 식당을 만들어주세요.');
    }

    const updatedStore = await this.storeRepository.updateStore(
      userId,
      storeName,
      foodType,
      location,
    );

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

  deleteStore = async (userId) => {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다.');
    }

    const deletedStore = await this.storeRepository.deleteStore(userId);

    return {
      storeId: deletedStore.storeId,
      storeName: deletedStore.storeName,
      foodType: deletedStore.foodType,
      sales: deletedStore.sales,
    };
  };

  // 모든 가게 목록 조회
  getStore = async () => {
    const store = await this.storeRepository.findStore();

    if (!store) {
      throw new Error('존재하는 음식점이 없습니다.');
    }

    return {
      store: store,
    };
  };
}
