import React, { useState } from 'react';

interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  budgeted: number;
  spent: number;
  color: string;
}

const initialCategories: BudgetCategory[] = [
  { id: '1', name: 'Housing', icon: '🏠', budgeted: 1200, spent: 1150, color: '#3B82F6' },
  { id: '2', name: 'Food', icon: '🍽️', budgeted: 600, spent: 750, color: '#10B981' },
  { id: '3', name: 'Transportation', icon: '🚗', budgeted: 400, spent: 350, color: '#F59E0B' },
  { id: '4', name: 'Entertainment', icon: '🎮', budgeted: 300, spent: 420, color: '#8B5CF6' },
  { id: '5', name: 'Utilities', icon: '💡', budgeted: 250, spent: 280, color: '#EC4899' },
  { id: '6', name: 'Shopping', icon: '🛍️', budgeted: 200, spent: 350, color: '#F97316' },
  { id: '7', name: 'Healthcare', icon: '🏥', budgeted: 150, spent: 120, color: '#06B6D4' },
  { id: '8', name: 'Savings', icon: '💰', budgeted: 500, spent: 500, color: '#6366F1' },
];

const BudgetPage: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Budget</h1>

        {/* Budget Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Total Budget</p>
            <p className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Spent</p>
            <p className="text-2xl font-bold text-red-600">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-600">Remaining</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {categories.map((category) => {
              const percentage = (category.spent / category.budgeted) * 100;
              const isOverBudget = percentage > 100;
              const isSelected = selectedCategory === category.id;

              return (
                <div 
                  key={category.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-600">
                          ${category.spent.toLocaleString()} of ${category.budgeted.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        {percentage.toFixed(0)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {isOverBudget ? 'Over budget' : 'Under budget'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-600' : 'bg-green-600'}`}
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Tips */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Budget Tips</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>You're over budget in Food and Entertainment categories. Consider reducing spending in these areas.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>You're on track with your savings goal. Keep it up!</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage; 