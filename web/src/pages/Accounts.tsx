import React, { useState, useEffect } from 'react';
import { Account, AccountType, Bank } from '../types/accounts';
import AccountModal from '../components/AccountModal';
import ConnectBankModal from '../components/ConnectBankModal';

const getAccountTypeName = (type: AccountType): string => {
  switch (type) {
    case 'deutschebank': return 'Deutsche Bank';
    case 'ing': return 'ING Bank';
    case 'paypal': return 'PayPal';
    default: return type;
  }
};

const getInstitutionName = (type: AccountType): string => {
  switch (type) {
    case 'deutschebank': return 'Deutsche Bank AG';
    case 'ing': return 'ING Bank N.V.';
    case 'paypal': return 'PayPal, Inc.';
    default: return '';
  }
};

const getAccountIcon = (type: AccountType): string => {
  switch (type) {
    case 'deutschebank': return '🏦';
    case 'ing': return '🏦';
    case 'paypal': return '💳';
    default: return '💳';
  }
};

const AccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddAccountModal, setShowAddAccountModal] = useState<boolean>(false);
  const [showConnectBankModal, setShowConnectBankModal] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Mock API call - replace with actual API call
      const mockAccounts: Account[] = [
        {
          id: '1',
          type: 'paypal',
          name: 'PayPal',
          balance: 427.81,
          institution: getInstitutionName('paypal'),
          lastSync: new Date().toISOString()
        },
        {
          id: '2',
          type: 'deutschebank',
          name: 'Main Checking',
          balance: 3245.67,
          institution: getInstitutionName('deutschebank'),
          lastSync: new Date().toISOString()
        }
      ];
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBank = (bankId: AccountType) => {
    const bank = {
      id: bankId,
      name: getAccountTypeName(bankId),
      icon: getAccountIcon(bankId),
      description: `Connect your ${getAccountTypeName(bankId)} account`
    };
    setSelectedBank(bank);
    setShowAddAccountModal(false);
    setShowConnectBankModal(true);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Accounts</h1>
          <button
            onClick={() => setShowAddAccountModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Account
          </button>
        </div>

        {/* Account Summary Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
          <p className="text-3xl font-bold mb-4">${totalBalance.toLocaleString()}</p>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Accounts Connected</span>
              <span className="font-semibold">{accounts.length}</span>
            </div>
          </div>
        </div>

        {/* Accounts List */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600 mb-4">No accounts connected yet</p>
            <button
              onClick={() => setShowAddAccountModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect Your First Account
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
                  {getAccountIcon(account.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{account.name}</h3>
                  <p className="text-sm text-gray-600">{account.institution}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${account.balance?.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    Last synced: {new Date(account.lastSync || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <AccountModal
          isOpen={showAddAccountModal}
          onClose={() => setShowAddAccountModal(false)}
          onSave={(account) => {
            // Handle saving the account
            console.log('Saving account:', account);
            setShowAddAccountModal(false);
          }}
        />

        <ConnectBankModal
          isOpen={showConnectBankModal}
          onClose={() => setShowConnectBankModal(false)}
          onSelectBank={(bankId) => {
            // Handle bank selection
            console.log('Selected bank:', bankId);
            setShowConnectBankModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default AccountsPage; 