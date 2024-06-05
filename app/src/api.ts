import { Router } from 'express';
import { router as accountRouter } from './features/accounts';

const router = Router();

router.use('/accounts', accountRouter);

export { router };
