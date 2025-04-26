import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
  const router = useRouter();

  useEffect(() => {
    fetchAccounts();
  }, []);

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
    router.push('/(drawer)/modal/add-account');
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
});

export default AccountsScreen;