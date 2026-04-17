import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const { userName } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Selamat Datang,</Text>
        <Text style={styles.name}>{userName || "User UNPRI"}! ✨</Text>
        <Text style={styles.sub}>Akun Anda telah terverifikasi secara aman.</Text>
      </View>

      <TouchableOpacity style={styles.btnLogout} onPress={() => router.replace('/')}>
        <Text style={styles.btnText}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6fa', padding: 20 },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '100%', alignItems: 'center', elevation: 5, marginBottom: 30 },
  welcome: { fontSize: 16, color: '#7f8c8d' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginVertical: 10 },
  sub: { fontSize: 14, color: '#95a5a6', textAlign: 'center' },
  btnLogout: { borderColor: '#e67e22', borderWidth: 2, paddingHorizontal: 40, paddingVertical: 12, borderRadius: 25 },
  btnText: { color: '#e67e22', fontWeight: 'bold' }
});