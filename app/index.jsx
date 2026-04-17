import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
// Import Icon Mata dari Expo
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State untuk mengontrol visibilitas password
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    // Validasi format email dasar
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      return Alert.alert('Error', 'Format email tidak valid!');
    }

    // Dummy Login sesuai contoh
    if (email === 'admin@mail.com' && password === '123456') {
      router.replace('/home'); 
    } else {
      Alert.alert('Akses Ditolak!', 'Email atau Password salah.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGIN SEKARANG 🔐</Text>
      <Text style={styles.subtitle}>Silakan login untuk lanjut!</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email (admin@mail.com)" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} 
        onChangeText={setEmail}
      />

      {/* Input Password dengan Icon Mata */}
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Password (123456)" 
          // secureTextEntry dikontrol oleh state
          secureTextEntry={secureText} 
          value={password} 
          onChangeText={setPassword}
        />
        {/* Tombol Icon Mata */}
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureText(!secureText)}>
          <Ionicons 
            name={secureText ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color="#7f8c8d" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>LOGIN SEKARANG</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Belum punya akun? </Text>
        <Link href="/register" style={styles.link}>Daftar di sini</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 35, backgroundColor: '#fff' },
  logo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#e67e22', marginBottom: 5 },
  subtitle: { textAlign: 'center', color: '#7f8c8d', marginBottom: 40 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 12, marginBottom: 25, fontSize: 16 },
  
  // Styles untuk Input Password dengan Icon
  passwordContainer: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    alignItems: 'center',
    marginBottom: 25 
  },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  eyeIcon: { padding: 10 },

  btnLogin: { backgroundColor: '#e67e22', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 30, flexDirection: 'row', justifyContent: 'center' },
  link: { color: '#2980b9', fontWeight: 'bold' }
});