import { Document } from "mongoose";
import { Transaction, TransactionPaymentChannelEnum } from "plaid";

export interface TUser extends Document {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  accessToken?: string,
  linkedBanks?: string[],
  next_cursor?: string,
  transactions?: TTransaction[],
  transactionsCategorized?: TTransaction[],
  categories?: string[]
}
 
/* 
export type TTransaction  = {
  id: string,
  name: string,
  logo_url: string,
  amount: number,
  currency: string,
  date: string,
  categories: string[],
  payment_channel: string
}
 */

interface TTransaction extends Transaction {
  id: string | null,
  currency: string | null,
  date: string,
  user_category? : string[],
  categories: string[] | null,
  payment_channel: TransactionPaymentChannelEnum,
}



