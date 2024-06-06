import { Account, AccountService } from '../src/features/accounts';
import { Transaction, TransactionService } from '../src/features/transactions';

import mongoose from 'mongoose';

jest.mock('../src/features/accounts/model');
jest.mock('../src/features/transactions/model');

describe('deposit', () => {
  it('should return balance of account if found', async () => {
    const mockAccount = {
      _id: new mongoose.Types.ObjectId(),
      balance: 10,
    };

    (Account.findById as jest.Mock).mockResolvedValue(mockAccount);

    (Account.updateOne as jest.Mock).mockImplementation(({ balance }) => {
      mockAccount.balance = mockAccount.balance + balance;
    });

    (Transaction.create as jest.Mock).mockResolvedValue({});

    await TransactionService.deposit(10, mockAccount._id.toString());

    const balance = await AccountService.getBalance(mockAccount._id.toString());
    console.log({ balance });
  });
});
