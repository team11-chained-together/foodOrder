import {
  StoreValidation,
  UpdateStoreValidation,
  DeleteStoreValidation,
  SearchStoreValidation,
} from '../utils/validators/controller/storeValidator.js';

export class StoreController {
  constructor(storeService) {
    3;
    this.storeService = storeService;
  }

  searchStores = async (req, res, next) => {
    try {
      const storeValidation = new SearchStoreValidation(req.query);
      storeValidation.validate();
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
        storeValidation.location,
        storeValidation.foodType,
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

      const deletedStore = await this.storeService.deleteStore(
        storeValidation.userId,
        req.body.storeId,
      );

      return res.status(200).json({
        message: '가게 삭제를 완료 하였습니다.',
        data: deletedStore,
      });
    } catch (err) {
      next(err);
    }
  };

  getStore = async (req, res, next) => {
    try {
      const storeName = req.body.storeName;
      const getStored = await this.storeService.getStore(storeName);

      return res.status(200).json({
        data: getStored,
      });
    } catch (err) {
      next(err);
    }
  };
}
