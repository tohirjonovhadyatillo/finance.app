import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useCollections';
import './Transactions.scss';
import { FaSortDown } from 'react-icons/fa';

const Transactions = () => {
  const { transactions, isPending } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Latest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (transactions) {
      let sorted = [...transactions];

      // Search filter
      sorted = sorted.filter((tx) =>
        (tx.sender || '').toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort by date
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'Latest' ? dateB - dateA : dateA - dateB;
      });

      // Category filter
      if (categoryFilter !== 'All') {
        sorted = sorted.filter(t => t.category === categoryFilter);
      }

      setFilteredTransactions(sorted);
    }
  }, [transactions, sortOrder, categoryFilter, searchTerm]);

  const categories = ['All', ...new Set(transactions?.map(t => t.category))];

  if (isPending) {
    return <div className="transactions__loading">Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isValidImageUrl = (url) => {
    return url && !url.includes('..') && url !== '.';
  };

  return (
    <div className="transactions">
      <div className="transactions__header">
        <h2>Transactions</h2>
        <div className="transactions__controls">
          <input
            type="text"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="transactions__search"
          />
          <div className="transactions__dropdowns">
            <button
              className="transactions__sort"
              onClick={() => setSortOrder(sortOrder === 'Latest' ? 'Oldest' : 'Latest')}
            >
              Sort by: {sortOrder} <FaSortDown />
            </button>
            <select
              className="transactions__filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="transactions__table-wrapper">
        <table className="transactions__table">
          <thead>
            <tr>
              <th>Recipient / Sender</th>
              <th>Category</th>
              <th>Transaction Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="transactions__user">
                    {isValidImageUrl(tx.image) ? (
                      <img src={tx.image} alt="User" className="transactions__user-image" />
                    ) : (
                      <div className="transactions__user-placeholder"></div>
                    )}
                    <span>{tx.sender}</span>
                  </td>
                  <td>{tx.category}</td>
                  <td>{formatDate(tx.date)}</td>
                  <td className={parseFloat(tx.amount) > 0 ? 'positive' : 'negative'}>
                    {parseFloat(tx.amount) > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="transactions__empty">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
