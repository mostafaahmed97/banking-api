import { AccountService } from '.';
import Joi from 'joi';
import { Router } from 'express';
import { ValidationError } from '../../error';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const newAccountId = await AccountService.create();

    return res.send({ newAccountId });
  } catch (error) {
    next(error);
  }
});

const balanceCheckValidation = Joi.object({
  accountId: Joi.required(),
});

router.get(
  '/:accountId/balance',
  (req, res, next) => {
    const { error } = balanceCheckValidation.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      next(new ValidationError(error.message));
    } else {
      next();
    }
  },
  async (req, res, next) => {
    try {
      const accountId = req.params.accountId;
      const balance = await AccountService.getBalance(accountId);

      return res.send({ balance });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
