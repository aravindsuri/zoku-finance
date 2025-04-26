import { Stack } from 'expo-router';

export default function ModalStack() {
  return <Stack screenOptions={{ presentation: 'modal' }} />;
}