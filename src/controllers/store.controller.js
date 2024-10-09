export class StoreController {
  constructor(storeService) {
    this.storeService = storeService;
  }

  createStore = async (req, res, next) => {
    try {
      // 로그인 인증 인가 미들웨어를 통해서 로그인한 유저의 정보를 가져와야함 그래서 크리에이트할떄 유저 정보를 입력하는 식으로 유저 ID, 유저 주소 이럴 느낌
      //const userId = req.cookie;
      //const type = req.user;

      const { userId, storeName, foodType, type } = req.body; // insomnia 테스트를 위해 userId를 바디값으로 받음

      // 사장과 손님 확인 작업
      if (type !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      if (!storeName || !foodType) {
        throw new Error('InvalidParamsError');
      }

      const createdStore = await this.storeService.createStore(userId, storeName, foodType);

      return res.status(201).json({ data: createdStore });
    } catch (err) {
      next(err);
    }
  };

  updateStore = async (req, res, next) => {
    try {
      //   const userId = req.cookie;
      const { userId, storeName, foodType, type } = req.body; // insomnia 테스트를 위해 userId를 바디값으로 받음

      // 사장과 손님 확인 작업
      if (type !== true) {
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
      // 인증 인가 부분이 없어서 임시로 body로 추가
      // const { userId } = req.user;
      // const type = req.user;
      const { storeName, userId, type } = req.body;

      // 사장과 손님 확인 작업
      if (type !== true) {
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
