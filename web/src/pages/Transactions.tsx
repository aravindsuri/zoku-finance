import React, { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  account: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-05-15', description: 'Grocery Store', category: 'Food', amount: 127.84, type: 'expense', account: 'Main Checking' },
  { id: '2', date: '2023-05-14', description: 'Monthly Salary', category: 'Income', amount: 3240.00, type: 'income', account: 'Main Checking' },
  { id: '3', date: '2023-05-12', description: 'Electric Bill', category: 'Utilities', amount: 94.56, type: 'expense', account: 'Main Checking' },
  { id: '4', date: '2023-05-10', description: 'Restaurant', category: 'Food', amount: 45.20, type: 'expense', account: 'Visa Platinum' },
  { id: '5', date: '2023-05-08', description: 'Gas Station', category: 'Transportation', amount: 35.75, type: 'expense', account: 'Visa Platinum' },
  { id: '6', date: '2023-05-05', description: 'Freelance Payment', category: 'Income', amount: 500.00, type: 'income', account: 'PayPal' },
  { id: '7', date: '2023-05-03', description: 'Online Shopping', category: 'Shopping', amount: 78.99, type: 'expense', account: 'Visa Platinum' },
  { id: '8', date: '2023-05-01', description: 'Rent', category: 'Housing', amount: 1200.00, type: 'expense', account: 'Main Checking' },
];

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Filter transactions based on selected filter and search term
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || 
      (filter === 'income' && transaction.type === 'income') || 
      (filter === 'expense' && transaction.type === 'expense');
    
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transactions</h1>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${filter === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('income')}
              >
                Income
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${filter === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilter('expense')}
              >
                Expenses
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold">{filteredTransactions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sortedDates.map(date => {
            const dateTransactions = groupedTransactions[date].filter(transaction => {
              const matchesFilter = filter === 'all' || 
                (filter === 'income' && transaction.type === 'income') || 
                (filter === 'expense' && transaction.type === 'expense');
              
              const matchesSearch = searchTerm === '' || 
                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
              
              return matchesFilter && matchesSearch;
            });

            if (dateTransactions.length === 0) return null;

            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            });

            return (
              <div key={date} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-50 px-4 py-2">
                  <h3 className="font-medium text-gray-700">{formattedDate}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {dateTransactions.map(transaction => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{transaction.description}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600 mr-2">{transaction.category}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-sm text-gray-600 ml-2">{transaction.account}</span>
                          </div>
                        </div>
                        <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage; 