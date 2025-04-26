export const unstable_settings = {
    // This will hide the screen from the tab bar
    href: null,
  };
  
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';

export default function ConnectBankScreen() {
  // This hook gives you access to the dynamic route param
  const { bankId } = useLocalSearchParams<{ bankId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Bank</Text>
      <Text style={styles.subtitle}>
        You selected: <Text style={styles.bankId}>{bankId}</Text>
      </Text>
      {/* Add your bank connection logic/UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#72787F',
  },
  bankId: {
    fontWeight: 'bold',
    color: '#2563EB',
  },
});