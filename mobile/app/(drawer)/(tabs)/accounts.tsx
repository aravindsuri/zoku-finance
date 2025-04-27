import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../services/api'; // Adjust path as needed

type Account = {
  id: string;
  type: 'deutschebank' | 'ing' | 'paypal';
  name?: string;
  balance?: number;
  institution: string;
  lastSync?: string;
};

const getAccountTypeName = (type: string): string => {
  switch (type) {
    case 'deutschebank': return 'Deutsche Bank';
    case 'ing': return 'ING Bank';
    case 'paypal': return 'PayPal';
    default: return type;
  }
};

const getInstitutionName = (type: string): string => {
  switch (type) {
    case 'deutschebank': return 'Deutsche Bank AG';
    case 'ing': return 'ING Bank N.V.';
    case 'paypal': return 'PayPal, Inc.';
    default: return '';
  }
};

const getAccountIcon = (type: string) => {
  switch (type) {
    case 'deutschebank': return 'business-outline';
    case 'ing': return 'business-outline';
    case 'paypal': return 'logo-paypal';
    default: return 'card-outline';
  }
};

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showConnectBankModal, setShowConnectBankModal] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Check if we should show the add account modal when the screen loads
  useEffect(() => {
    if (params.showAddAccount === 'true') {
      setShowAddAccountModal(true);
    }
  }, [params]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Call your API to get user accounts
      const response = await api.get('/users/me');
      const userAccounts = response.data.accounts || [];
      setAccounts(userAccounts.map((acc: any) => ({
        id: acc.id || Math.random().toString(),
        type: acc.type,
        name: acc.accountData?.name || getAccountTypeName(acc.type),
        balance: acc.accountData?.balance || 0,
        institution: getInstitutionName(acc.type),
        lastSync: acc.lastUpdated || new Date().toISOString()
      })));
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToAddAccount = () => {
    setShowAddAccountModal(true);
  };

  const closeAddAccountModal = () => {
    setShowAddAccountModal(false);
  };

  const handleSelectBank = (bankId: string) => {
    setSelectedBankId(bankId);
    setShowAddAccountModal(false);
    setShowConnectBankModal(true);
  };

  const closeConnectBankModal = () => {
    setShowConnectBankModal(false);
  };

  const goBackToBankSelection = () => {
    setShowConnectBankModal(false);
    setShowAddAccountModal(true);
  };

  const renderAccountItem = ({ item }: { item: Account }) => (
    <View style={styles.accountCard}>
      <View style={styles.accountRow}>
        <View style={styles.accountIcon}>
          <Ionicons 
            name={getAccountIcon(item.type)} 
            size={24} 
            color={item.type === 'paypal' ? '#003087' : '#0052CC'} 
          />
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{item.name}</Text>
          <Text style={styles.accountInstitution}>{item.institution}</Text>
        </View>
        <Text style={styles.accountBalance}>
          ${item.balance?.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  // Define the bank options here for the modal
  const banks = [
    {
      id: 'deutschebank',
      name: 'Deutsche Bank',
      icon: 'business-outline',
      description: 'Connect your Deutsche Bank accounts via secure API'
    },
    {
      id: 'ing',
      name: 'ING Bank',
      icon: 'business-outline',
      description: 'Connect your ING direct banking accounts'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'logo-paypal',
      description: 'Connect your PayPal account to track transactions'
    }
  ];

  // Get bank name from ID
  const getBankName = (bankId: string | null) => {
    if (!bankId) return '';
    const bank = banks.find(b => b.id === bankId);
    return bank ? bank.name : bankId;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Accounts</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddAccount}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Account Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Balance</Text>
        <Text style={styles.summaryBalance}>
          ${accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0).toLocaleString()}
        </Text>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Accounts Connected</Text>
          <Text style={styles.summaryValue}>{accounts.length}</Text>
        </View>
      </View>

      {/* Accounts List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0052CC" style={styles.loader} />
      ) : accounts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No accounts connected yet</Text>
          <TouchableOpacity 
            style={styles.connectButton} 
            onPress={navigateToAddAccount}
          >
            <Text style={styles.connectButtonText}>Connect Your First Account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={renderAccountItem}
          contentContainerStyle={styles.accountsList}
        />
      )}

      <TouchableOpacity style={styles.addAccountButton} onPress={navigateToAddAccount}>
        <Ionicons name="add-circle-outline" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.addAccountButtonText}>Connect New Account</Text>
      </TouchableOpacity>

      {/* Add Account Modal */}
      <Modal
        visible={showAddAccountModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeAddAccountModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Financial Account</Text>
              <TouchableOpacity onPress={closeAddAccountModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Select your bank or financial service to connect
            </Text>

            <ScrollView style={styles.banksList}>
              {banks.map((bank) => (
                <TouchableOpacity
                  key={bank.id}
                  style={styles.bankCard}
                  onPress={() => handleSelectBank(bank.id)}
                >
                  <View style={styles.bankIconContainer}>
                    <Ionicons 
                      name={bank.icon as any} 
                      size={28} 
                      color={bank.id === 'paypal' ? '#003087' : '#0052CC'} 
                    />
                  </View>
                  <View style={styles.bankInfo}>
                    <Text style={styles.bankName}>{bank.name}</Text>
                    <Text style={styles.bankDescription}>{bank.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#A0A8B0" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#72787F" style={{marginRight: 6}} />
              <Text style={styles.securityText}>
                Your credentials are securely transmitted. We never store your banking passwords.
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Connect Bank Modal */}
      <Modal
        visible={showConnectBankModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeConnectBankModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={goBackToBankSelection} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Connect {getBankName(selectedBankId)}</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <View style={styles.connectBankContainer}>
              <Text style={styles.connectText}>You selected: {selectedBankId}</Text>
              
              {/* Add your bank connection UI here */}
              <View style={styles.formContainer}>
                {/* This is just placeholder UI for the bank connection form */}
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <View style={styles.input}>
                    <Text style={styles.inputPlaceholder}>Enter your bank username</Text>
                  </View>
                </View>
                
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.input}>
                    <Text style={styles.inputPlaceholder}>Enter your bank password</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#0052CC',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryBalance: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E5EA',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#72787F',
    fontSize: 14,
  },
  summaryValue: {
    fontWeight: '600',
    fontSize: 14,
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#72787F',
    marginBottom: 16,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#0052CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  connectButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  accountsList: {
    paddingBottom: 80,
  },
  accountCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  accountInstitution: {
    color: '#72787F',
    fontSize: 12,
  },
  accountBalance: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addAccountButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#0052CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  addAccountButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '90%', // Take up most of the screen
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  backButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 16, 
    color: '#72787F',
    marginBottom: 24,
  },
  banksList: {
    flex: 1,
  },
  bankCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bankIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bankDescription: {
    fontSize: 14,
    color: '#72787F',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 16,
  },
  securityText: {
    fontSize: 12,
    color: '#72787F',
    textAlign: 'center',
    flex: 1,
  },
  connectBankContainer: {
    flex: 1,
    paddingTop: 24,
  },
  connectText: {
    fontSize: 16,
    color: '#72787F',
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  inputPlaceholder: {
    color: '#A0A8B0',
  },
});

export default AccountsScreen;