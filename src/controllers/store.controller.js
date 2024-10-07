export class StoreController {
  constructor(storeService) {
    this.storeService = storeService;
  }

  createStore = async (req, res, next) => {
    try {
      const { storeName, foodType } = req.body;

      if (!storeName || !foodType) {
        throw new Error('InvalidParamsError');
      }

      const createdStore = await this.storeService.createStore(storeName, foodType);

      return res.status(201).json({ data: createdStore });
    } catch (err) {
      next(err);
    }
  };
}
