import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { CheckOrderService } from '../../../src/services/checkOrder.service.js';
import {
  CheckedOrder,
  UpdatedOrderStatement,
} from '../../../src/utils/validators/service/checkOrderValidator.js';

let mockCheckOrderRepository = {
  findStorIdByUserId: jest.fn(),
  findOrderIdByStoreId: jest.fn(),
  findOrderIdByUserId: jest.fn(),
  findOrderByOrderId: jest.fn(),
  updateOrderStatement: jest.fn(),
};

describe('체크 오더 서비스 유닛 테스트'),
  () => {
    let checkOrderService = new CheckOrderService(mockCheckOrderRepository);

    beforeEach(() => {
      checkOrderService = jest.resetAllMocks();
    });

    test('체크오더 성공 테스트'),
      async () => {
        const mockStoreData = {};
        mockCheckOrderRepository.getStoreData;
      };
  };
