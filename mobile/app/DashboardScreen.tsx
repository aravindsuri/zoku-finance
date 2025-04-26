import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const accounts = [
  { name: 'Main Checking', balance: '$3,245.67', bank: 'Chase Bank', color: '#339DFF' },
  { name: 'Savings', balance: '$12,750', bank: 'Chase Bank', color: '#8B5CF6' },
  { name: 'PayPal', balance: '$427.81', bank: 'PayPal', color: '#A78BFA' },
  { name: 'Visa Platinum', balance: '$1,872.33', bank: 'Capital One', color: '#F87171' },
];

const transactions = [
  { id: 1, name: 'Grocery Store', date: '04/25/2025', category: 'Food', amount: '-$127.84', color: '#F87171' },
  { id: 2, name: 'Monthly Salary', date: '04/24/2025', category: 'Income', amount: '+$3240.00', color: '#22C55E' },
  { id: 3, name: 'Electric Bill', date: '04/22/2025', category: 'Utilities', amount: '-$94.56', color: '#F87171' },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>💲</Text>
        <Text style={styles.appName}>Zoku Finance</Text>
        <Text style={styles.bell}>🔔</Text>
      </View>

      <ScrollView>
        {/* Greeting */}
        <Text style={styles.greeting}>Hi, Aravind 👋</Text>
        <Text style={styles.date}>April 26, 2025</Text>

        {/* Accounts */}
        <Text style={styles.sectionTitle}>Your Accounts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountsRow}>
          {accounts.map((acc, idx) => (
            <View key={idx} style={[styles.accountCard, { backgroundColor: acc.color }]}>
              <Text style={styles.accountName}>{acc.name}</Text>
              <Text style={styles.accountBalance}>{acc.balance}</Text>
              <Text style={styles.accountBank}>{acc.bank}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Monthly Cash Flow */}
        <Text style={styles.sectionTitle}>Monthly Cash Flow</Text>
        <View style={styles.cashFlowRow}>
          <View style={styles.cashFlowItem}>
            <Text style={styles.incomeLabel}>Income</Text>
            <Text style={styles.incomeValue}>$5,200</Text>
          </View>
          <View style={styles.cashFlowItem}>
            <Text style={styles.expenseLabel}>Expenses</Text>
            <Text style={styles.expenseValue}>$3,850</Text>
          </View>
          <View style={styles.cashFlowItem}>
            <Text style={styles.netLabel}>Net</Text>
            <Text style={styles.netValue}>$1,350</Text>
          </View>
        </View>

        {/* Financial Insights */}
        <View style={styles.insightsBox}>
          <Text style={styles.insightsTitle}>AI Financial Insights</Text>
          <Text style={styles.insight}>• You've spent 28% more on dining this month compared to your average.</Text>
          <Text style={styles.insight}>• Your electric bill is higher than usual. Consider checking for energy-saving opportunities.</Text>
        </View>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={[styles.transactionAmount, { color: item.color }]}>{item.amount}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 40, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  logo: { fontSize: 28 },
  appName: { fontSize: 22, fontWeight: 'bold' },
  bell: { fontSize: 22 },
  greeting: { fontSize: 22, fontWeight: 'bold', marginBottom: 2 },
  date: { color: '#6B7280', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  accountsRow: { flexDirection: 'row', marginBottom: 16 },
  accountCard: { width: 160, borderRadius: 16, padding: 16, marginRight: 12 },
  accountName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  accountBalance: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  accountBank: { color: '#fff', fontSize: 12 },
  cashFlowRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cashFlowItem: { alignItems: 'center', flex: 1 },
  incomeLabel: { color: '#22C55E', fontWeight: 'bold' },
  incomeValue: { color: '#22C55E', fontSize: 18, fontWeight: 'bold' },
  expenseLabel: { color: '#F87171', fontWeight: 'bold' },
  expenseValue: { color: '#F87171', fontSize: 18, fontWeight: 'bold' },
  netLabel: { color: '#2563EB', fontWeight: 'bold' },
  netValue: { color: '#2563EB', fontSize: 18, fontWeight: 'bold' },
  insightsBox: { backgroundColor: '#339DFF', borderRadius: 16, padding: 16, marginBottom: 16 },
  insightsTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  insight: { color: '#fff', fontSize: 14, marginBottom: 4 },
  transactionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  transactionName: { fontSize: 16 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
});
