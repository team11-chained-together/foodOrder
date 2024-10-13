export class StoreController {
  constructor(storeService) {
    this.storeService = storeService;
  }

  searchStores = async (req, res, next) => {
    try {
      const { search } = req.query;

      if (!search) {
        throw new Error('검색 문자를 입력해주세요.');
      }

      const stores = await this.storeService.searchStores(search);

      return res.status(200).json({ data: stores });
    } catch (err) {
      next(err);
    }
  };

  createStore = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;
      const { storeName, location, foodType } = req.body;

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
      const { storeId, storeName, foodType } = req.body;

      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      if (!storeId) {
        throw new Error('해당하는 스토어 아이디를 입력해 주세요.');
      }

      const updatedStore = await this.storeService.updateStore(
        userId,
        storeId,
        storeName,
        foodType,
      );
      return res.status(200).json({ data: updatedStore });
    } catch (err) {
      next(err);
    }
  };

  deleteStore = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const isOwner = req.user.isOwner;
      const { storeId } = req.body;

      if (isOwner !== true) {
        throw new Error('해당하는 유저는 사장님이 아닙니다.');
      }

      const deletedStore = await this.storeService.deleteStore(userId, storeId);

      return res.status(200).json({ message: '가게 삭제를 완료 하였습니다.', data: deletedStore });
    } catch (err) {
      next(err);
    }
  };

  getStore = async (req, res, next) => {
    try {
      const getStore = await this.storeService.getStore();

      return res.status(200).json({ data: getStore });
    } catch (err) {
      next(err);
    }
  };
}
