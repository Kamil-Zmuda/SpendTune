import React from 'react';
import { useCombinedStore } from '../../store/Store';
import { TTransaction } from '../../types/types';
import Transaction from '../transaction/transaction';
import './transactions.css';

function Transactions() {
  const loggedUser = useCombinedStore((state) => state.logged);
  const transactions = loggedUser?.transactions;
  const transactionsCategorized = loggedUser?.transactionsCategorized;

  return loggedUser && transactions ? (
    <div className="transactions">
      {loggedUser.linkedBanks ? (
        <>
          {!transactions.length ? (
            <h3 className="transactions__prompt">Sync transactions to start</h3>
          ) : (
            <>
              <div className="transactions__head">
                <h2 className="transactions__title">Uncategorised Payments</h2>
              </div>
              <div className="transactions__table">
                <div className="transactions__header-row">
                  <div className="transactions__header">Amount</div>
                  <div className="transactions__header">Date</div>
                  <div className="transactions__header">Payment Channel</div>
                  <div className="transactions__header">Category</div>
                </div>
                {transactions.map((transaction: TTransaction) => (
                  <Transaction key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </>
          )}
          {!transactions.length &&
            transactionsCategorized &&
            transactionsCategorized.length && (
              <h2 className="transactions__title">
                No more transactions to categorize
              </h2>
            )}
        </>
      ) : (
        <h3 className="transactions__prompt">
          Sync your bank to get new transactions
        </h3>
      )}
    </div>
  ) : (
    <p>Data has not been loaded</p>
  );
}

export default Transactions;
