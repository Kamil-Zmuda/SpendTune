import { useState } from 'react';
import { useCombinedStore } from '../../store/Store';
import { assignCategory } from '../../apiService';
import { TTransaction } from '../../types/types';
import './transaction.css';

type TransactionProps = {
  transaction: TTransaction;
};

function Transaction(props: TransactionProps) {
  const { transaction } = props;
  const loggedUser = useCombinedStore((state) => state.logged);
  const token = useCombinedStore((state) => state.token);
  const setLoggedUser = useCombinedStore((state) => state.setLoggedUser);
  const setAuthToken = useCombinedStore((state) => state.setAuthToken);

  async function handleCategoryAssign(e: React.ChangeEvent<HTMLSelectElement>) {
    if (token) {
      const assignCategoryData = {
        category: e.target.value,
        id: transaction.id,
        token: token,
      };
      const updatedUser = await assignCategory(assignCategoryData);
      setLoggedUser(updatedUser);
      setAuthToken(token);
    }
  }

  return (
    <div className="transaction__row">
      <div className="transaction__details">
        {transaction.logo_url ? (
          <img
            className="transaction__logo"
            src={transaction.logo_url}
            alt="logo"
          />
        ) : (
          <img
            className="transaction__logo"
            src="/No_image_available.svg"
            alt="No logo found"
          />
        )}
        <div className="transaction__amount">
          <p className="transaction__name">{transaction.name}</p>
          <p className="transaction__value">
            {transaction.amount} {transaction.currency}
          </p>
        </div>
      </div>
      <div className="transaction__date">{transaction.date}</div>
      <div className="transaction__channel">{transaction.payment_channel}</div>
      <div className="transaction__category">
        <select
          data-testid="test-select"
          onChange={(e) => handleCategoryAssign(e)}
          className="transaction__dropdown"
        >
          <option value="">Uncategorised</option>
          {loggedUser &&
            loggedUser.categories &&
            loggedUser.categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}

export default Transaction;
