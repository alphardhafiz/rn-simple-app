import React, { useContext, useMemo } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const auth = useContext(AuthContext);
  const { colors, scheme } = useTheme();

  const navigationTheme = useMemo(
    () => ({
      ...(scheme === "dark" ? DarkTheme : DefaultTheme),
      colors: {
        ...(scheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.inputBorder,
        notification: colors.primary,
      },
    }),
    [scheme, colors]
  );

  if (auth?.isLoading) {
    return (
      <View
        style={[
          loadingStyles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[loadingStyles.text, { color: colors.subtleText }]}>
          Loading application data...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        {auth?.userToken == null ? (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Daftar User",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={auth.logout}
                    style={appStyles.logoutButton}
                  >
                    <Ionicons
                      name="log-out-outline"
                      size={24}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                ),
              }}
            />

            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ title: "Detail Pengguna" }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
  },
});

const appStyles = StyleSheet.create({
  logoutButton: {
    padding: 5,
    borderRadius: 5,
  },
});

export default AppNavigator;
