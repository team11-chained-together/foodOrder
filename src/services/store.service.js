export class StoreService {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  //음식점 검색 기능
  searchStores = async(search)=>{
 
    //레퍼지토리에서 검색된 목록가져옴
    const store = await this.storeRepository.searchStores(search);
    
    if(StoreService.length ===0){
      throw new Error('검색 결과가 없습니다.');
    }
    //해당 검색 음식점 정보와 음식점 메뉴 데이터 반환
    return store.map((store)=>({
      storeId:store.storeId,
      userId:store.userId,
      storeName:store.storeName,
      location:store.location,
      foodType:store.foodType,
      sales:store.sales,
      createdAt:store.createdAt,
      updatedAt:store.updatedAt,
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

  updateStore = async (userId, storeName, foodType) => {
    // 저장소(Repository)에게 특정 유저아이디의 상점을 요청합니다.
    const store = await this.storeRepository.findStoreByUserId(userId);
    if (!store) {
      throw new Error('보유하고 있는 식당이 없습니다, 식당을 만들어주세요.');
    }

    await this.storeRepository.updateStore(userId, storeName, foodType);

    // 변경된 데이터 조회
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
    // 저장소(Repository)에게 특정 유저아이디의 상점을 요청합니다.
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

  getStore = async (storeName) => {
    const store = await this.storeRepository.findStoreByStoreName(storeName);

    if (!store) {
      throw new Error('해당하는 음식점이 없습니다.');
    }

    const menu = await this.storeRepository.findMenuByStoreId(store.storeId);

    return {
      storeId: store.storeId,
      userId: store.userId,
      storeName: store.storeName,
      foodType: store.foodType,
      menu: menu,
      createdAt: store.createdAt,
    };
  };
}
