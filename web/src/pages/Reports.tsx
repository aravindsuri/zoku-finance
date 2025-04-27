import React, { useState } from 'react';

interface ExpenseData {
  category: string;
  amount: number;
  color: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

const expenseData: ExpenseData[] = [
  { category: 'Housing', amount: 1200, color: '#3B82F6' },
  { category: 'Food', amount: 750, color: '#10B981' },
  { category: 'Transportation', amount: 350, color: '#F59E0B' },
  { category: 'Entertainment', amount: 420, color: '#8B5CF6' },
  { category: 'Utilities', amount: 280, color: '#EC4899' },
  { category: 'Shopping', amount: 350, color: '#F97316' },
  { category: 'Healthcare', amount: 120, color: '#06B6D4' },
  { category: 'Savings', amount: 500, color: '#6366F1' },
];

const monthlyData: MonthlyData[] = [
  { month: 'Jan', income: 5200, expenses: 3850 },
  { month: 'Feb', income: 5100, expenses: 3900 },
  { month: 'Mar', income: 5300, expenses: 4000 },
  { month: 'Apr', income: 5200, expenses: 3850 },
  { month: 'May', income: 5400, expenses: 3700 },
  { month: 'Jun', income: 5100, expenses: 3950 },
];

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('month');
  const [reportType, setReportType] = useState<string>('expenses');

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const maxExpense = Math.max(...expenseData.map(item => item.amount));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>

        {/* Report Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTimeRange('week')}
              >
                Week
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTimeRange('month')}
              >
                Month
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTimeRange('year')}
              >
                Year
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${reportType === 'expenses' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setReportType('expenses')}
              >
                Expenses
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${reportType === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setReportType('income')}
              >
                Income
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${reportType === 'cashflow' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setReportType('cashflow')}
              >
                Cash Flow
              </button>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        {reportType === 'expenses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
              <div className="space-y-4">
                {expenseData.map((item) => {
                  const percentage = (item.amount / totalExpenses) * 100;
                  return (
                    <div key={item.category}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.category}</span>
                        <span className="font-medium">${item.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-600 mt-1">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Largest Category</p>
                  <p className="text-xl font-bold">
                    {expenseData.find(item => item.amount === maxExpense)?.category}
                  </p>
                  <p className="text-gray-600">
                    ${maxExpense.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Average per Category</p>
                  <p className="text-xl font-bold">
                    ${(totalExpenses / expenseData.length).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Trends */}
        {reportType === 'cashflow' && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Monthly Cash Flow</h2>
            <div className="h-64 flex items-end space-x-2">
              {monthlyData.map((month) => {
                const maxValue = Math.max(
                  ...monthlyData.map(m => Math.max(m.income, m.expenses))
                );
                const incomeHeight = (month.income / maxValue) * 100;
                const expenseHeight = (month.expenses / maxValue) * 100;
                
                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center">
                    <div className="flex h-full w-full items-end justify-center space-x-1">
                      <div 
                        className="w-1/2 bg-green-500 rounded-t"
                        style={{ height: `${incomeHeight}%` }}
                      ></div>
                      <div 
                        className="w-1/2 bg-red-500 rounded-t"
                        style={{ height: `${expenseHeight}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm font-medium">{month.month}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Income</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Expenses</span>
              </div>
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Financial Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">Spending Trends</h3>
              <p className="text-blue-700">
                Your spending on Food has increased by 15% compared to last month. Consider setting a budget for dining out to keep expenses under control.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">Savings Opportunity</h3>
              <p className="text-green-700">
                You're saving 20% of your income, which is good! To reach your savings goal faster, consider reducing spending on Entertainment by 10%.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-2">Income Growth</h3>
              <p className="text-purple-700">
                Your income has increased by 5% over the last 3 months. Keep up the good work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 