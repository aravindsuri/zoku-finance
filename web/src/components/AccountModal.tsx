import React from 'react';
import { Bank } from '../types/accounts';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBank: (bank: Bank) => void;
}

const mockBanks: Bank[] = [
  {
    id: 'chase',
    name: 'Chase',
    icon: '🏦',
    description: 'Chase Bank - Personal & Business Banking',
  },
  {
    id: 'bankofamerica',
    name: 'Bank of America',
    icon: '🏦',
    description: 'Bank of America - Banking, Credit Cards, and More',
  },
  {
    id: 'wellsfargo',
    name: 'Wells Fargo',
    icon: '🏦',
    description: 'Wells Fargo - Banking, Credit Cards, Loans, and More',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    description: 'PayPal - Send and receive money with ease',
  },
  {
    id: 'venmo',
    name: 'Venmo',
    icon: '💸',
    description: 'Venmo - Share expenses with friends',
  },
];

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSelectBank }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Your Bank</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {mockBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => onSelectBank(bank)}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center space-x-4"
            >
              <span className="text-2xl">{bank.icon}</span>
              <div className="text-left">
                <h3 className="font-medium">{bank.name}</h3>
                <p className="text-sm text-gray-500">{bank.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Don't see your bank? We're adding more banks soon!</p>
        </div>
      </div>
    </div>
  );
};

export default AccountModal; 