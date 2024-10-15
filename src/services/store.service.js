import {
  SearchStoreValidation,
  CreateStoreValidation,
  StoreValidation,
  GetStoreValidation,
} from '../utils/validators/service/storeValidator.js';

export class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  searchStores = async (search) => {
    const store = await this.storeRepository.searchStores(search);
    const storeValidation = new SearchStoreValidation(store);
    storeValidation.validate();

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
    const storeValidation = new CreateStoreValidation(store);
    storeValidation.validate();

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
    const storeValidation = new StoreValidation(store);
    storeValidation.validate();

    const updatedStore = await this.storeRepository.updateStore(
      userId,
      storeName,
      location,
      foodType,
    );

    return {
      userId: updatedStore.userId,
      storeId: updatedStore.storeId,
      storeName: updatedStore.storeName,
      location: updatedStore.location,
      foodType: updatedStore.foodType,
      sales: updatedStore.sales,
      createdAt: updatedStore.createdAt,
      updatedAt: updatedStore.updatedAt,
    };
  };

  deleteStore = async (userId) => {
    const store = await this.storeRepository.findStoreByUserId(userId);
    const storeValidation = new StoreValidation(store);
    storeValidation.validate();

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
    const stores = await this.storeRepository.findStore();
    const getStoreValidation = new GetStoreValidation(stores);
    getStoreValidation.validate();

    return {
      store: stores,
    };
  };
}
