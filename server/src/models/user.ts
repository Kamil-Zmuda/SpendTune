import { Transaction } from 'plaid';
import { TUser } from '../@types';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema<TUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: ''
  },
  linkedBanks: {
    type: Array<string>,
    default: []
  },
  next_cursor: {
    type: String,
    default: null
  },
  transactions: {
    type: Array<Transaction>,
    default: [],
  },
  transactionsCategorized: {
    type: Array<Transaction>,
    default: [],
  },
  categories: {
    type: Array<string>,
    default: [],
  }
});

export default mongoose.model<TUser>('User', userSchema);
