import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#e67e22' }, 
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' } 
    }}>
      <Stack.Screen name="index" options={{ title: "Beranda" }} />
      <Stack.Screen name="register" options={{ title: "Daftar Akun Baru" }} />
      <Stack.Screen name="home" options={{ title: "Dashboard", headerLeft: () => null }} />
    </Stack>
  );
}