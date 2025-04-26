import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>$</Text>
        </View>
        <Text style={styles.appName}>Zoku Finance</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
          <Feather name="x" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.avatarCircle}>
          <Feather name="user" size={32} color="#6B7280" />
        </View>
        <View>
          <Text style={styles.userName}>Aravind Suri</Text>
          <Text style={styles.userEmail}>aravind.suri@example.com</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItem
          label="Dashboard"
          icon={({ color, size }) => <Feather name="home" size={size} color={color} />}
          onPress={() => props.navigation.navigate('index')}
          focused={props.state.index === 0}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Budget"
          icon={({ color, size }) => <MaterialIcons name="track-changes" size={size} color={color} />}
          onPress={() => props.navigation.navigate('budget')}
          focused={props.state.index === 1}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Transactions"
          icon={({ color, size }) => <Feather name="arrow-up-right" size={size} color={color} />}
          onPress={() => props.navigation.navigate('transactions')}
          focused={props.state.index === 2}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Reports"
          icon={({ color, size }) => <Feather name="bar-chart-2" size={size} color={color} />}
          onPress={() => {/* Add navigation if you have a reports page */}}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Accounts"
          icon={({ color, size }) => <Feather name="credit-card" size={size} color={color} />}
          onPress={() => props.navigation.navigate('accounts')}
          focused={props.state.index === 3}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <Feather name="settings" size={size} color={color} />}
          onPress={() => {/* Add navigation if you have a settings page */}}
          labelStyle={styles.drawerLabel}
        />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Account</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', margin: 16 },
  logoCircle: { backgroundColor: '#2563EB', borderRadius: 32, width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  appName: { fontWeight: 'bold', fontSize: 22, flex: 1 },
  closeButton: { padding: 8 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  avatarCircle: { backgroundColor: '#F3F4F6', borderRadius: 32, width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  userName: { fontWeight: 'bold', fontSize: 18 },
  userEmail: { color: '#6B7280' },
  drawerLabel: { fontSize: 16, fontWeight: '500' },
  addButton: { backgroundColor: '#2563EB', borderRadius: 16, padding: 16, alignItems: 'center', margin: 16 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
