import React, { useState } from 'react';

interface Bank {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedBank: Bank;
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
  onBack,
  selectedBank,
}) => {
  const [step, setStep] = useState<'credentials' | 'security'>('credentials');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityCode: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'credentials') {
      // In a real app, validate credentials here
      setStep('security');
    } else {
      // In a real app, handle bank connection here
      console.log('Connecting to bank...', { bank: selectedBank, formData });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold">Connect {selectedBank.name}</h2>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl">{selectedBank.icon}</span>
            <div>
              <h3 className="font-medium">{selectedBank.name}</h3>
              <p className="text-sm text-gray-500">{selectedBank.description}</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: step === 'credentials' ? '50%' : '100%' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 'credentials' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Security Code
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the security code sent to your registered email/phone
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 'credentials' ? 'Continue' : 'Connect Bank'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            By connecting your bank, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectBankModal; 