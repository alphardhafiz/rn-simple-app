// src/screens/LoginScreen.tsx

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { generateJwt } from "../config/jwt";
import { Ionicons } from "@expo/vector-icons";

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
    <View style={styles.container}>
      {isAnyLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.title}>Technical Test</Text>
        <Text style={styles.subtitle}>Sign In</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={handleManualLogin}
          disabled={isAnyLoading}
        >
          <Text style={styles.textWhite}>LOGIN</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginVertical: 15, color: "#999" }}
        >
          - ATAU -
        </Text>

        <TouchableOpacity
          style={[styles.btnLogin, styles.btnGoogle]}
          onPress={handleGoogleLoginSimulation}
          disabled={isAnyLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons
                name="logo-google"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.textWhite}>
                Masuk dengan Google (Simulasi)
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F0F2F5",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: { flex: 1, height: 50 },
  btnLogin: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnGoogle: { backgroundColor: "#DB4437", marginTop: 5 },
  textWhite: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default LoginScreen;
