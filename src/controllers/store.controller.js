import {
  StoreValidation,
  UpdateStoreValidation,
  DeleteStoreValidation,
  SearchStoreValidation,
} from '../utils/validators/storeValidator.js';

export class StoreController {
  constructor(storeService) {
    this.storeService = storeService;
  }

  // 키워드 검색
  searchStores = async (req, res, next) => {
    try {
      const storeValidation = new SearchStoreValidation(req.query);

      const stores = await this.storeService.searchStores(storeValidation.search);

      return res.status(200).json({ data: stores });
    } catch (err) {
      next(err);
    }
  };

  createStore = async (req, res, next) => {
    try {
      const storeValidation = new StoreValidation(req.user.userId, req.user.isOwner, req.body);

      storeValidation.validate();

      const createdStore = await this.storeService.createStore(
        storeValidation.userId,
        storeValidation.storeName,
        storeValidation.location,
        storeValidation.foodType,
      );

      return res.status(201).json({ data: createdStore });
    } catch (err) {
      next(err);
    }
  };

  updateStore = async (req, res, next) => {
    try {
      const storeValidation = new UpdateStoreValidation(
        req.user.userId,
        req.user.isOwner,
        req.body,
      );
      storeValidation.validate();

      const updatedStore = await this.storeService.updateStore(
        storeValidation.userId,
        storeValidation.storeName,
        storeValidation.foodType,
        storeValidation.location,
      );
      return res.status(200).json({ data: updatedStore });
    } catch (err) {
      next(err);
    }
  };

  deleteStore = async (req, res, next) => {
    try {
      const storeValidation = new DeleteStoreValidation(req.user.userId, req.user.isOwner);
      storeValidation.validate();

      const deletedStore = await this.storeService.deleteStore(storeValidation.userId);

      return res.status(200).json({
        message: '가게 삭제를 완료 하였습니다.',
        data: deletedStore,
      });
    } catch (err) {
      next(err);
    }
  };

  // 전체 상점 조회
  getStore = async (req, res, next) => {
    try {
      const getStore = await this.storeService.getStore();

      return res.status(200).json({
        data: getStore,
      });
    } catch (err) {
      next(err);
    }
  };
}
//수정
