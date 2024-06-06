import { Account, AccountService } from '../src/features/accounts';

import mongoose from 'mongoose';

jest.mock('../src/features/accounts/model');

describe('getBalance', () => {
  const mockAccount = {
    _id: new mongoose.Types.ObjectId(),
    balance: 10,
  };

  it('should return balance of account if found', async () => {
    (Account.findById as jest.Mock).mockResolvedValue(mockAccount);

    const result = await AccountService.getBalance(mockAccount._id.toString());

    expect(result).toEqual(mockAccount.balance);
  });
});
