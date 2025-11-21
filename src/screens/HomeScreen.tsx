import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import UserCard from "../components/UserCard";
import { RootStackParamList, User } from "../types";
import UserHeader from "../components/UserHeader";
import { Ionicons } from "@expo/vector-icons";

const shuffleArray = <T extends any>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      setError(null);

      if (allUsers.length === 0) {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setAllUsers(response.data);
      }

      const shuffled = shuffleArray(
        allUsers.length > 0
          ? allUsers
          : (await axios.get("https://jsonplaceholder.typicode.com/users")).data
      );
      const minCount = 5;
      const maxCount = Math.min(shuffled.length, 10);
      const randomCount =
        Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

      const randomlyFilteredUsers = shuffled.slice(0, randomCount);

      setUsers(randomlyFilteredUsers as User[]);
    } catch (err) {
      setError("Gagal memuat data. Periksa koneksi internet atau API.");
      setUsers([]);
      setAllUsers([]);
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

  if (loading && !refreshing) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.infoText, { color: colors.subtleText }]}>
          Sedang memuat data pengguna...
        </Text>
      </View>
    );
  }

  if (error || users.length === 0) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <Ionicons
          name={error ? "cloud-offline-outline" : "alert-circle-outline"}
          size={50}
          color={error ? colors.error : "#FFC107"}
          style={{ marginBottom: 15 }}
        />
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error || "Tidak ada data pengguna yang tersedia."}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={onRefresh}
        >
          <Text style={styles.retryText}>
            <Ionicons name="refresh" size={16} color="white" />
            {"  "}Coba Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ListHeaderComponent={
          <UserHeader
            title={`Daftar (${users.length} dari ${allUsers.length})`}
          />
        }
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            data={item}
            onPress={() => navigation.navigate("Detail", { item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  retryText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default HomeScreen;
