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
      createdAt: createdStore.createdAt,
      updatedAt: createdStore.updatedAt,
    };
  };

  updateStore = async (userId, storeId, storeName, foodType) => {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다, 식당을 만들어주세요.');
    }

    if (store.storeId !== storeId) {
      throw new Error('해당하는 식당의 사장님이 아닙니다.');
    }

    const updatedStore = await this.storeRepository.updateStore(
      userId,
      storeId,
      storeName,
      foodType,
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

  deleteStore = async (userId, storeId) => {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다.');
    }

    if (store.storeId !== storeId) {
      throw new Error('해당하는 식당의 사장님이 아닙니다.');
    }

    const deletedStore = await this.storeRepository.deleteStore(userId, storeId);

    return {
      storeId: deletedStore.storeId,
      storeName: deletedStore.storeName,
      foodType: deletedStore.foodType,
      sales: deletedStore.sales,
    };
  };

  getStore = async (storeName) => {
    const store = await this.storeRepository.findStoreByStoreName(storeName);

    if(!store){
      throw new Error('해당하는 음식점이 없습니다.');
    }

    return {
      store: store,
    };
  };
}
