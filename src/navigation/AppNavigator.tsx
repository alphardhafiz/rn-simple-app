import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const auth = useContext(AuthContext);

  const PRIMARY_COLOR = "#4B6CB7";
  const BACKGROUND_COLOR = "#F0F4F8";

  if (auth?.isLoading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={loadingStyles.text}>Loading application data...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: PRIMARY_COLOR,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: BACKGROUND_COLOR },
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
                      color="#DC3545"
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
    color: "#666",
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
