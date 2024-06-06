import { ForbiddenError, NotFoundError } from '../../error';

import { Account } from '../accounts';
import { Transaction } from './model';

export async function deposit(
  amount: number,
  accountId: string
): Promise<string> {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new NotFoundError('Account not found');
  }

  const transaction = await Transaction.create({
    accountId: account.id,
    amount: amount,
    operation: 'deposit',
  });

  await account.updateOne({ balance: account.balance + amount });

  return transaction.id;
}

export async function withdraw(
  amount: number,
  accountId: string
): Promise<string> {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new NotFoundError('Account not found');
  }

  if (account.balance < amount) {
    throw new ForbiddenError('Insufficent balance');
  }

  const transaction = await Transaction.create({
    accountId: account.id,
    amount: amount,
    operation: 'withdraw',
  });

  await account.updateOne({ balance: account.balance - amount });

  return transaction.id;
}
