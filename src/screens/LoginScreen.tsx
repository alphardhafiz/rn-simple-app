// src/screens/LoginScreen.tsx

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform, // Ditambahkan untuk penyesuaian shadow
} from "react-native";
// Library tambahan untuk Gradien (Perlu diinstal: expo install expo-linear-gradient)
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import { generateJwt } from "../config/jwt";
import { Ionicons } from "@expo/vector-icons";

// Catatan: Pastikan Anda telah menginstal 'expo-linear-gradient'
// jalankan: expo install expo-linear-gradient

const LoginScreen = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleManualLogin = () => {
    // 💡 Validasi Input
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email))
      return Alert.alert("Validasi Gagal", "Email tidak valid.");
    if (password.length < 6)
      return Alert.alert("Validasi Gagal", "Password minimal 6 karakter.");

    // 💡 JWT Generation
    const token = generateJwt(email);
    auth?.login(email, token);
  };

  // 💡 Fungsi Simulasi Google Login (Aman dan Stabil)
  const handleGoogleLoginSimulation = () => {
    setIsGoogleLoading(true);

    // Simulasikan delay network
    setTimeout(() => {
      const mockGoogleEmail = "google_user@gmail.com";
      const mockGoogleToken = "google-access-token-SAMPLE";

      setIsGoogleLoading(false);
      auth?.login(mockGoogleEmail, mockGoogleToken);
    }, 1500);
  };

  const isAnyLoading = auth?.isLoading || isGoogleLoading;

  return (
    // Gunakan LinearGradient sebagai background utama
    <LinearGradient
      colors={["#4b6cb7", "#182848"]} // Gradien Biru Tua ke Biru Laut
      style={styles.container}
    >
      {isAnyLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}

      {/* Card Login dengan Shadow yang lebih modern */}
      <View style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={50} color="#4b6cb7" style={styles.iconHeader} />
        <Text style={styles.title}>Secure Access</Text>
        <Text style={styles.subtitle}>Welcome back! Please sign in.</Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#4b6cb7" // Warna ikon lebih mencolok
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Input Password */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#4b6cb7" // Warna ikon lebih mencolok
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Tombol Login Manual dengan Gradien */}
        <TouchableOpacity
          onPress={handleManualLogin}
          disabled={isAnyLoading}
          style={styles.btnWrapper}
        >
          <LinearGradient
            colors={["#4b6cb7", "#182848"]}
            style={styles.btnLogin}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.textWhite}>
              {auth?.isLoading ? "Loading..." : "LOGIN"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.dividerText}>- ATAU -</Text>

        {/* Tombol Login Google (Simulasi) */}
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={handleGoogleLoginSimulation}
          disabled={isAnyLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color="#4b6cb7" />
          ) : (
            <>
              <Ionicons
                name="logo-google"
                size={20}
                color="#DB4437" // Warna Ikon Google Asli
                style={styles.googleIcon}
              />
              <Text style={styles.textGoogle}>
                Masuk dengan Google (Simulasi)
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Ubah overlay agar terlihat di background gelap
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 16,
    // Soft Shadow untuk Android
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  iconHeader: {
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800", // Lebih tebal
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F4F7F9", // Warna latar belakang input
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA", // Border yang sangat tipis
  },
  inputIcon: {
    marginRight: 10,
  },
  input: { 
    flex: 1, 
    height: 50, 
    fontSize: 16,
    color: "#333",
  },
  btnWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden", // Memastikan gradien tidak keluar dari batas
  },
  btnLogin: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
  },
  textWhite: { 
    color: "white", 
    fontWeight: "700", 
    fontSize: 16 
  },
  dividerText: { 
    textAlign: "center", 
    marginVertical: 20, 
    color: "#C0C0C0",
    fontWeight: "600",
  },
  btnGoogle: { 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1, // Tambahkan border agar terlihat menonjol
    borderColor: "#DDD",
    height: 55,
  },
  googleIcon: { marginRight: 15 },
  textGoogle: {
    color: "#4b6cb7", // Warna teks senada dengan primary color
    fontWeight: "600",
    fontSize: 16
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#4b6cb7",
    fontSize: 14,
    fontWeight: "600",
  }
});

export default LoginScreen;