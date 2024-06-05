import { Account } from './model';
import { NotFoundError } from '../../error';

export async function create() {
  const account = await Account.create({ balance: 0 });

  return account.id;
}

export async function getBalance(accountId: string): Promise<number> {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new NotFoundError('Account not found');
  }

  return account.balance;
}
