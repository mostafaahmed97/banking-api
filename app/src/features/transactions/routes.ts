import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';
import { TransactionService } from '.';
import { ValidationError } from '../../error';

const router = Router();

const routeSchema = Joi.object({
  accountId: Joi.string().required(),
});

const amountSchema = Joi.object({
  amount: Joi.number().integer().min(1).required(),
});

const transactionValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: accountIdError } = routeSchema.validate(req.params);
  const { error: amountError } = amountSchema.validate(req.body);

  if (accountIdError) {
    next(new ValidationError(accountIdError.message));
  } else if (amountError) {
    next(new ValidationError(amountError.message));
  } else {
    next();
  }
};

router.post(
  '/:accountId/deposit',
  transactionValidationMiddleware,
  async (req, res, next) => {
    try {
      const amount = Number(req.body.amount);
      const accountId = req.params.accountId;

      const transactionId = await TransactionService.deposit(amount, accountId);

      return res.send({ transactionId });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:accountId/withdraw',
  transactionValidationMiddleware,
  async (req, res, next) => {
    try {
      const amount = Number(req.body.amount);
      const accountId = req.params.accountId;

      const transactionId = await TransactionService.withdraw(
        amount,
        accountId
      );

      return res.send({ transactionId });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
