import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { generateJwt } from "../config/jwt";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const auth = useContext(AuthContext);
  const { colors, scheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isDark = scheme === "dark";

  const handleManualLogin = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email))
      return Alert.alert("Validasi Gagal", "Email tidak valid.");
    if (password.length < 6)
      return Alert.alert("Validasi Gagal", "Password minimal 6 karakter.");

    const token = generateJwt(email);
    auth?.login(email, token);
  };

  const handleGoogleLoginSimulation = () => {
    setIsGoogleLoading(true);

    setTimeout(() => {
      const mockGoogleEmail = "google_user@gmail.com";
      const mockGoogleToken = "google-access-token-SAMPLE";

      setIsGoogleLoading(false);
      auth?.login(mockGoogleEmail, mockGoogleToken);
    }, 1500);
  };

  const isAnyLoading = auth?.isLoading || isGoogleLoading;

  const gradientColors = isDark
    ? (["#1E1E1E", "#121212"] as [string, string])
    : (["#4b6cb7", "#182848"] as [string, string]);

  const buttonGradientColors = isDark
    ? (["#7AB8FF", "#5574AA"] as [string, string])
    : (["#4b6cb7", "#182848"] as [string, string]);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {isAnyLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Ionicons
          name="shield-checkmark-outline"
          size={50}
          color={colors.primary}
          style={styles.iconHeader}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Secure Access
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtleText }]}>
          Welcome back! Please sign in.
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.inputBorder,
            },
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={colors.primary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Email Address"
            placeholderTextColor={colors.subtleText}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.inputBorder,
            },
          ]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={colors.primary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.subtleText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleManualLogin}
          disabled={isAnyLoading}
          style={styles.btnWrapper}
        >
          <LinearGradient
            colors={buttonGradientColors}
            style={styles.btnLogin}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={styles.textWhite}>
              {auth?.isLoading ? "Loading..." : "LOGIN"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.dividerText, { color: colors.subtleText }]}>
          - ATAU -
        </Text>

        <TouchableOpacity
          style={[
            styles.btnGoogle,
            {
              backgroundColor: colors.card,
              borderColor: colors.inputBorder,
            },
          ]}
          onPress={handleGoogleLoginSimulation}
          disabled={isAnyLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              <Ionicons
                name="logo-google"
                size={20}
                color={colors.googleIcon}
                style={styles.googleIcon}
              />
              <Text style={[styles.textGoogle, { color: colors.primary }]}>
                Masuk dengan Google
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  card: {
    padding: 30,
    borderRadius: 16,
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
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  btnWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
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
    fontSize: 16,
  },
  dividerText: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "600",
  },
  btnGoogle: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    height: 55,
  },
  googleIcon: {
    marginRight: 15,
  },
  textGoogle: {
    fontWeight: "600",
    fontSize: 16,
  },
});

export default LoginScreen;
