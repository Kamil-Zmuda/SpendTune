import { Response, Request, Router } from 'express';
import userController from './controllers/user.controller';
import { auth } from './middlewares/auth';
import categoryController from './controllers/category.controller';
import transactionController from './controllers/transaction.controller';

const router = Router();

// ROUTES FOR API INTERACTION
router.get('/api/create-link-token', transactionController.createLinkToken);
router.post(
  '/api/exchange-public-token',
  transactionController.exchangePublicToken
);
router.post('/api/sync-transactions', transactionController.syncTransactions);

// ROUTES FOR CLIENT INTERACTION
router.post('/category/add', auth, categoryController.addCategory);
router.post('/category/assign', auth, categoryController.assignCategory);

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.delete('/user', auth, userController.delete);

router.get('*', (req: Request, res: Response) => {
  res.status(404).send('Sorry, not found 😞');
});

export default router;
