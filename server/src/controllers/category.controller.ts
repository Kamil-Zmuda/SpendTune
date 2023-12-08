import { Request, RequestHandler, Response } from 'express';
import User from '../models/user';
import { getUserIdFromToken } from '../utils/getUserIdFromToken';

const categoryController: { [k: string]: RequestHandler } = {};

categoryController.addCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const userId = getUserIdFromToken(req);
    const user = userId && (await User.findOne({ _id: userId }));
    if (user && user.categories) {
      user.categories.push(category);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(400).send({ message: 'User not found in the database' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Failed to add category' });
  }
};

categoryController.assignCategory = async (req: Request, res: Response) => {
  try {
    const { category, id } = req.body;
    const userId = getUserIdFromToken(req);
    const user = userId && (await User.findOne({ _id: userId }));
    const transactions = user && user.transactions ? user.transactions : [];
    const [transaction] = transactions.filter(
      (transaction) => transaction.id === id
    );
    transaction.user_category = category;

    if (!user) throw new Error('No user on category assignment.');
    if (!user.transactions) throw new Error('No transactions found');
    const removeIndex = user.transactions.findIndex(
      (transaction) => transaction.id === id
    );

    user.transactions.splice(removeIndex, 1);

    const prevTransactions = user.transactionsCategorized
      ? user.transactionsCategorized
      : [];
    user.transactionsCategorized = [...prevTransactions, transaction];

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to assign category' });
  }
};

export default categoryController;
