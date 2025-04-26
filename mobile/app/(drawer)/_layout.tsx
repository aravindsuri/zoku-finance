import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router';
import CustomDrawerContent from '../(drawer)/CustomDrawerContent';

export default function DrawerLayout() {
  return <Drawer drawerContent={props => <CustomDrawerContent {...props} />} />;
}

export function TabLayout() {
  return <Tabs />;
}
