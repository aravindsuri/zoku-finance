export const unstable_settings = {
  // This will hide the screen from the tab bar
  href: null,
};

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

interface BankOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const AddAccountScreen = () => {
  const router = useRouter();

  const banks: BankOption[] = [
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

  const handleSelectBank = (bankId: string) => {
    router.push({
      pathname: '/(drawer)/connect-bank/[bankId]',
      params: { bankId }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Financial Account</Text>
      <Text style={styles.subtitle}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
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
});

export default AddAccountScreen;