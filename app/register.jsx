import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { useRouter } from 'expo-router';
// Import Icon Mata dari Expo
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  // State terpisah untuk visibilitas masing-masing password
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handleRegister = () => {
    const { name, email, phone, password, confirmPassword } = form;

    // 1. Cek Kosong
    if (!name || !email || !phone || !password || !confirmPassword) {
      return Alert.alert('Waduh!', 'Semua kolom harus diisi.');
    }

    // 2. Validasi Email (RegEx)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Alert.alert('Security Alert', 'Format email tidak valid!');
    }

    // 3. Validasi Phone (Angka & min 10 digit)
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone) || phone.length < 10) {
      return Alert.alert('Security Alert', 'Nomor telepon harus angka dan minimal 10 digit.');
    }

    // 4. Match Check Password
    if (password !== confirmPassword) {
      return Alert.alert('Security Alert', 'Password dan Konfirmasi Password tidak cocok!');
    }

    // Jika lolos semua:
    Alert.alert('Sukses!', 'Akun berhasil dibuat.');
    router.replace({ pathname: '/home', params: { userName: name } });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1, backgroundColor: '#f5f6fa' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Join Startup Baru 🚀</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput style={styles.input} placeholder="Masukkan Nama" onChangeText={(val) => setForm({...form, name: val})} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="email@startup.com" keyboardType="email-address" autoCapitalize="none" onChangeText={(val) => setForm({...form, email: val})} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <TextInput style={styles.input} placeholder="Minimal 10 digit" keyboardType="numeric" onChangeText={(val) => setForm({...form, phone: val})} />
          </View>

          {/* Input Password dengan Icon Mata */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Password" 
                secureTextEntry={securePassword} 
                onChangeText={(val) => setForm({...form, password: val})} 
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecurePassword(!securePassword)}>
                <Ionicons 
                  name={securePassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#7f8c8d" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Konfirmasi Password dengan Icon Mata */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Ulangi Password" 
                secureTextEntry={secureConfirmPassword} 
                onChangeText={(val) => setForm({...form, confirmPassword: val})} 
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
                <Ionicons 
                  name={secureConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#7f8c8d" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>DAFTAR SEKARANG</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 30, paddingBottom: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#dcdde1' },
  
  // Styles untuk Input Password dengan Icon di Register
  passwordContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#dcdde1', 
    alignItems: 'center' 
  },
  passwordInput: { flex: 1, padding: 15 },
  eyeIcon: { padding: 15 },

  button: { backgroundColor: '#e67e22', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});