import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../(drawer)/CustomDrawerContent';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: '',
      }}
    />
  );
}
