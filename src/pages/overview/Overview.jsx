import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight, Eye } from 'lucide-react';
import styles from './overview.module.scss';
import { useCollectionsData } from '../../hooks/useCollections';

const parseAmount = (val) => parseFloat(String(val).replace(/,/g, '')) || 0;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const COLORS = ['#6C5CE7', '#00CEFF', '#00B894', '#FDCB6E', '#D63031'];

const Overview = () => {
  const { data, isPending, error } = useCollectionsData();

  const financialData = useMemo(() => {
    if (!data) return null;

    const transactions = data.transactions || [];
    const pots = data.pots || [];
    const budgets = data.budgets || [];

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseAmount(t.amount), 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseAmount(t.amount), 0);

    const currentBalance = parseAmount(data.balance?.[0]?.current || 0);
    const totalSaved = pots.reduce((sum, pot) => sum + parseAmount(pot.total), 0);

    const budgetData = budgets.map((budget, index) => ({
      name: budget.category,
      value: parseAmount(budget.maximum),
      color: COLORS[index % COLORS.length],
      spent: parseAmount(budget.spent || 0),
      percentage: Math.min(100, Math.round((parseAmount(budget.spent || 0) / parseAmount(budget.maximum)) * 100)),
    }));

    const totalBudgetSpent = budgetData.reduce((sum, item) => sum + item.value, 0);

    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);


    const recurringBills = transactions
      .filter(t => t.isRecurring)
      .slice(0, 3);

    const totalRecurring = recurringBills.reduce(
      (sum, t) => sum + parseAmount(t.amount),
      0
    );

    return {
      totalIncome,
      totalExpenses,
      currentBalance,
      totalSaved,
      budgetData,
      totalBudgetSpent,
      recentTransactions,
      recurringBills,
      totalRecurring,
      pots,
      budgets,
    };
  }, [data]);

  if (isPending) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner} />
        <p>Loading your financial data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }

  if (!financialData) {
    return (
      <div className={styles.errorState}>
        <p>No financial data available</p>
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <h1>Financial Overview</h1>

      <div className={styles.financialSummary}>
        <div className={styles.summaryCard}>
          <h3>Current Balance</h3>
          <p className={`${styles.amount} ${
            financialData.currentBalance >= 0 ? styles.positive : styles.negative
          }`}>
            {formatCurrency(financialData.currentBalance)}
          </p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total Income</h3>
          <p className={`${styles.amount} ${styles.positive}`}>
            {formatCurrency(financialData.totalIncome)}
          </p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total Expenses</h3>
          <p className={`${styles.amount} ${styles.negative}`}>
            {formatCurrency(financialData.totalExpenses)}
          </p>
        </div>
      </div>


      <div className={styles.overviewGrid}>

        <div className={styles.potsSection}>
          <div className={styles.sectionHeader}>
            <h2>Savings Pots</h2>
            <button className={styles.seeDetails}>
              See Details <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.potsContent}>
            <div className={styles.totalPot}>
              <div className={styles.potIcon}>🏦</div>
              <div className={styles.potInfo}>
                <p className={styles.label}>Total Saved</p>
                <p className={styles.amount}>{formatCurrency(financialData.totalSaved)}</p>
              </div>
            </div>
            <div className={styles.potList}>
              {financialData.pots.slice(0, 2).map(pot => (
                <div key={pot.id} className={styles.potItem}>
                  <p className={styles.name}>{pot.name}</p>
                  <p className={styles.amount}>{formatCurrency(parseAmount(pot.total))}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className={styles.budgetsSection}>
          <div className={styles.sectionHeader}>
            <h2>Budgets</h2>
            <button className={styles.seeDetails}>
              See Details <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.budgetsContent}>
            <div className={styles.budgetChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {financialData.budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.budgetTotal}>
                <p className={styles.amount}>{formatCurrency(financialData.totalBudgetSpent)}</p>
                <p className={styles.label}>SPENT SO FAR</p>
              </div>
            </div>
            <div className={styles.budgetList}>
              {financialData.budgets.slice(0, 3).map(budget => {
                const percentage = Math.min(100, 
                  Math.round((parseAmount(budget.spent || 0) / parseAmount(budget.maximum)) * 100)
                );
                
                return (
                  <div key={budget.id} className={styles.budgetItem}>
                    <p className={styles.name}>{budget.category}</p>
                    <div className={styles.progressContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[financialData.budgets.indexOf(budget) % COLORS.length],
                        }}
                      />
                    </div>
                    <p className={styles.amount}>{formatCurrency(parseAmount(budget.maximum))}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.transactionsSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Transactions</h2>
            <button className={styles.seeDetails}>
              View All <Eye size={16} />
            </button>
          </div>
          <div className={styles.transactionsList}>
            {financialData.recentTransactions.map(transaction => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.avatar}>
                  {transaction.avatar ? (
                    <img src={transaction.avatar} alt={transaction.name} />
                  ) : (
                    transaction.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className={styles.details}>
                  <p className={styles.name}>{transaction.name}</p>
                  <p className={styles.date}>{formatDate(transaction.date)}</p>
                </div>
                <p className={`${styles.amount} ${
                  transaction.type === 'income' ? styles.income : styles.expense
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(Math.abs(parseAmount(transaction.amount)))}
                </p>
              </div>
            ))}
          </div>
        </div>

 
        <div className={styles.recurringBillsSection}>
          <div className={styles.sectionHeader}>
            <h2>Upcoming Bills</h2>
            <button className={styles.seeDetails}>
              See Details <ArrowRight size={16} />
            </button>
          </div>
          <div className={styles.billsList}>
            {financialData.recurringBills.map(bill => (
              <div key={bill.id} className={styles.billItem}>
                <p className={styles.name}>{bill.name}</p>
                <p className={styles.amount}>{formatCurrency(parseAmount(bill.amount))}</p>
              </div>
            ))}
          </div>
          <div className={styles.totalBills}>
            <p className={styles.label}>Total Upcoming</p>
            <p className={styles.amount}>{formatCurrency(financialData.totalRecurring)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;