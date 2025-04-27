import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const accounts = [
    { id: 1, name: 'Checking Account', balance: 5280.42, type: 'bank' },
    { id: 2, name: 'Savings Account', balance: 12750.89, type: 'bank' },
    { id: 3, name: 'Credit Card', balance: -1250.75, type: 'credit' },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.42, date: '2024-03-15' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, date: '2024-03-14' },
    { id: 3, description: 'Electric Bill', amount: -120.50, date: '2024-03-13' },
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Balance</h2>
          <p className="text-3xl font-bold text-blue-600">${totalBalance.toLocaleString()}</p>
          <div className="mt-4">
            <Link 
              to="/accounts" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Accounts →
            </Link>
          </div>
        </div>

        {/* Monthly Income Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Monthly Income</h2>
          <p className="text-3xl font-bold text-green-600">$5,200.00</p>
          <div className="mt-4">
            <Link 
              to="/reports" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Income Details →
            </Link>
          </div>
        </div>

        {/* Monthly Expenses Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Monthly Expenses</h2>
          <p className="text-3xl font-bold text-red-600">$3,850.00</p>
          <div className="mt-4">
            <Link 
              to="/budget" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Budget Details →
            </Link>
          </div>
        </div>
      </div>

      {/* Accounts Overview */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Accounts Overview</h2>
          <Link 
            to="/accounts" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {accounts.map((account) => (
              <div key={account.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.type}</p>
                  </div>
                  <p className={`font-bold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(account.balance).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Link 
            to="/transactions" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 