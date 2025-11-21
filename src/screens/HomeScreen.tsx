// src/screens/HomeScreen.tsx

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
// import UserCard from "../components/UserCard";
import { RootStackParamList, User } from "../types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      // Pemanggilan API menggunakan Axios dan Try-Catch
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      // 💡 Error Handling
      setError("Gagal memuat data. Periksa koneksi internet atau API.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.welcome}>Selamat Datang,</Text>
      <Text style={styles.userEmail}>{auth?.userInfo?.email}</Text>
      <Text style={styles.infoText}>
        Token: {auth?.userToken?.substring(0, 10)}...
      </Text>
    </View>
  );

  // 💡 UX/UI: Loading, Error, dan Empty State
  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.infoText}>Loading data users...</Text>
      </View>
    );
  }
  if (error || users.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Data kosong."}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <FlatList
        ListHeaderComponent={renderHeader}
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            data={item}
            // 💡 Navigasi dan passing data
            onPress={() => navigation.navigate("Detail", { item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 20 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 20 },
  welcome: { fontSize: 14, color: "#666" },
  userEmail: { fontSize: 20, fontWeight: "bold", color: "#333" },
  infoText: { fontSize: 12, color: "#999", marginTop: 5 },
  errorText: { color: "red", fontSize: 16, marginBottom: 10 },
  retryButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  retryText: { color: "white", fontWeight: "bold" },
});

export default HomeScreen;
