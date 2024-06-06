import mongoose, { Schema } from 'mongoose';

interface ITransaction {
  accountId: String;
  operation: 'deposit' | 'withdraw';
  amount: number;
}

const schema = new mongoose.Schema<ITransaction>({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  operation: { type: String, enum: ['withdraw', 'deposit'], required: true },
  amount: { type: Number, required: true },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', schema);
