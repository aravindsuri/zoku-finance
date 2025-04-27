import React, { useState } from 'react';
import AccountModal from './AccountModal';
import ConnectBankModal from './ConnectBankModal';

interface Bank {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const BankConnectionFlow: React.FC = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setIsAccountModalOpen(false);
    setIsConnectModalOpen(true);
  };

  const handleBack = () => {
    setIsConnectModalOpen(false);
    setIsAccountModalOpen(true);
  };

  const handleClose = () => {
    setIsAccountModalOpen(false);
    setIsConnectModalOpen(false);
    setSelectedBank(null);
  };

  return (
    <>
      <button
        onClick={() => setIsAccountModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Connect Bank Account
      </button>

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={handleClose}
        onSelectBank={handleBankSelect}
      />

      {selectedBank && (
        <ConnectBankModal
          isOpen={isConnectModalOpen}
          onClose={handleClose}
          onBack={handleBack}
          selectedBank={selectedBank}
        />
      )}
    </>
  );
};

export default BankConnectionFlow; 