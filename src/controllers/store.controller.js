export class StoreController {
  constructor(storeService) {
    this.storeService = storeService;
  }

  //음식점 검색
  searchStores = async(req,res,next) => {
    try{
      //쿼리 피라미터에서 검색
      const{search} = req.query;

      if(!search){
        throw new Error('검색 문자를 입력해주세요.');
      }
      //서비스와 연결

      const stores = await this.storeService.searchStores(search);
      
      return res.status(200).json({data:stores});
    }catch(err){
      next(err);
    }
  };



  createStore = async (req, res, next) => {
    try {
      // 로그인 인증 인가 미들웨어를 통해서 로그인한 유저의 정보 조회
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;

      const { storeName, location, foodType } = req.body; // insomnia 테스트를 위해 userId를 바디값으로 받음

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      if (!storeName || !foodType) {
        throw new Error('InvalidParamsError');
      }

      const createdStore = await this.storeService.createStore(
        userId,
        storeName,
        location,
        foodType,
      );

      return res.status(201).json({ data: createdStore });
    } catch (err) {
      next(err);
    }
  };

  updateStore = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;
      const { storeName, foodType } = req.body;

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      const updatedStore = await this.storeService.updateStore(userId, storeName, foodType);
      return res.status(200).json({ data: updatedStore });
    } catch (err) {
      next(err);
    }
  };

  deleteStore = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;
      const { storeName } = req.body;

      // 사장과 손님 확인 작업
      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      // 서비스 계층에 구현된 deleteStore 로직을 실행합니다.
      const deletedStore = await this.storeService.deleteStore(userId, storeName);

      return res.status(200).json({ message: '가게 삭제를 완료 하였습니다.', data: deletedStore });
    } catch (err) {
      next(err);
    }
  };

  getStore = async (req, res, next) => {
    try {
      const { storeName } = req.body;

      const getStore = await this.storeService.getStore(storeName);

      return res.status(200).json({ data: getStore });
    } catch (err) {
      next(err);
    }
  };
}
