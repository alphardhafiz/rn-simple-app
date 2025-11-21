// src/screens/DetailScreen.tsx

import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList, User } from "../types";
import UserCard from "../components/UserCard";
import { Ionicons } from "@expo/vector-icons";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const item: User = route.params.item;

  return (
    <ScrollView style={styles.container}>
      <UserCard data={item} isDetail={true} />

      <View style={styles.detailCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="call-outline" size={24} color="#4B6CB7" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="globe-outline" size={24} color="#4B6CB7" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.label}>Website</Text>
          <Text style={styles.value}>{item.website}</Text>
        </View>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="location-outline" size={24} color="#4B6CB7" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
            {item.address?.street}, {item.address?.suite}, {item.address?.city}
            {item.address?.zipcode && ` ${item.address.zipcode}`}
          </Text>
        </View>
      </View>

      {item.company && (
        <View style={styles.detailCard}>
          <View style={styles.iconWrapper}>
            <Ionicons name="business-outline" size={24} color="#4B6CB7" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{item.company.name}</Text>
            {item.company.catchPhrase && (
              <Text style={styles.subValue}>"{item.company.catchPhrase}"</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 15,
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
      },
      android: { elevation: 3 },
    }),
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 3,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  subValue: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default DetailScreen;
