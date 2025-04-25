import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useCollections';
import './Transactions.scss';
import { FaSortDown } from 'react-icons/fa';

const Transactions = () => {
  const { transactions, isPending } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Latest');

  useEffect(() => {
    if (transactions) {
      let sorted = [...transactions];

      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'Latest' ? dateB - dateA : dateA - dateB;
      });

      if (categoryFilter !== 'All') {
        sorted = sorted.filter(t => t.category === categoryFilter);
      }

      setFilteredTransactions(sorted);
    }
  }, [transactions, sortOrder, categoryFilter]);

  const categories = ['All', ...new Set(transactions?.map(t => t.category))];

  if (isPending) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const isValidImageUrl = (url) => {
    return url && !url.includes('..') && url !== '.'; // URL'da '...' yoki '.' bo'lmasligi kerak
  };

  return (
    <div className="transactions">
      <div className="transactions__header">
        <h2>Transactions</h2>
        <div className="transactions__controls">
          <input type="text" placeholder="Search transaction" className="search" />
          <div className="dropdowns">
            <div className="dropdown">
              <button onClick={() => setSortOrder(sortOrder === 'Latest' ? 'Oldest' : 'Latest')}>
                Sort by: {sortOrder} <FaSortDown />
              </button>
            </div>
            <div className="dropdown">
              <select onChange={e => setCategoryFilter(e.target.value)} value={categoryFilter}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <table className="transactions__table">
        <thead>
          <tr>
            <th>Recipient / Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.sender}</td>
              <td>{tx.category}</td>
              <td>{formatDate(tx.date)}</td>
              <td className={parseFloat(tx.amount) > 0 ? 'positive' : 'negative'}>
                {parseFloat(tx.amount) > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </td>
              <td>
                {isValidImageUrl(tx.image) ? (
                  <img src={tx.image} alt="Transaction" className="transaction-image" />
                ) : (
                  <span>No Image Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="transactions__pagination">
        <button>&lt; Prev</button>
        <div className="pages">
          {[1, 2, 3, 4, 5].map((p, i) => (
            <button key={i} className={i === 2 ? 'active' : ''}>{p}</button>
          ))}
        </div>
        <button>Next &gt;</button>
      </div>
    </div>
  );
};

export default Transactions;
