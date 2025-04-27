export type AccountType = 
  | 'chase'
  | 'bankofamerica'
  | 'wellsfargo'
  | 'paypal'
  | 'venmo';

export interface Bank {
  id: AccountType;
  name: string;
  icon: string;
  description: string;
}

export interface Account {
  id: string;
  type: AccountType;
  name: string;
  balance: number;
  institution: string;
  lastSync?: string;
}

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBank: (bankId: AccountType) => void;
}

export interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedBank: Bank | null;
} 