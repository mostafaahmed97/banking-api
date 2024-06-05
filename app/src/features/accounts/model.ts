import mongoose from 'mongoose';

interface IAccount {
  balance: number;
}

const schema = new mongoose.Schema<IAccount>({
  balance: { type: Number, required: true },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Account = mongoose.model<IAccount>('Account', schema);
