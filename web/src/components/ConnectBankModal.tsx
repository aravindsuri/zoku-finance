import React from 'react';

interface Bank {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBank: (bankId: string) => void;
}

const banks: Bank[] = [
  {
    id: 'chase',
    name: 'Chase',
    icon: '🏦',
    description: 'Connect your Chase bank accounts securely',
  },
  {
    id: 'bankofamerica',
    name: 'Bank of America',
    icon: '🏦',
    description: 'Connect your Bank of America accounts',
  },
  {
    id: 'wellsfargo',
    name: 'Wells Fargo',
    icon: '🏦',
    description: 'Connect your Wells Fargo accounts',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    description: 'Connect your PayPal account',
  },
  {
    id: 'venmo',
    name: 'Venmo',
    icon: '💸',
    description: 'Connect your Venmo account',
  },
];

const ConnectBankModal: React.FC<ConnectBankModalProps> = ({
  isOpen,
  onClose,
  onSelectBank,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Connect Bank Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Select your bank or financial service to connect
        </p>

        <div className="space-y-4">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => onSelectBank(bank.id)}
              className="w-full p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {bank.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{bank.name}</h3>
                <p className="text-sm text-gray-600">{bank.description}</p>
              </div>
              <div className="text-gray-400">›</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
          <span className="mr-2">🔒</span>
          <p>
            Your credentials are securely transmitted. We never store your banking passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectBankModal; 