import { Router } from 'express';
import { router as accountRouter } from './features/accounts';
import { router as transactionRouter } from './features/transactions';

const router = Router();

router.use('/accounts', accountRouter);
router.use('/transactions', transactionRouter);

export { router };
