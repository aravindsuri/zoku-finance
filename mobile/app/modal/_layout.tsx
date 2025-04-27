import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'card', // Change from 'modal' to 'card'
        headerShown: true,
        animation: 'default'
      }}
    />
  );
}