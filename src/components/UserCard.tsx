// src/components/UserCard.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface UserCardProps {
  data: User;
  onPress?: () => void;
  isDetail?: boolean;
}

const UserCard = ({ data, onPress, isDetail = false }: UserCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, isDetail && styles.detailCard]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{data.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.email}>{data.email}</Text>
        {isDetail && data.company && (
          <Text style={styles.company}>🏢 {data.company.name}</Text>
        )}
      </View>
      {!isDetail && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailCard: {
    backgroundColor: "#E3F2FD",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#BBDEFB",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: { color: "white", fontSize: 20, fontWeight: "bold" },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  email: { fontSize: 14, color: "#666" },
  company: { fontSize: 13, color: "#555", marginTop: 4 },
});

export default UserCard;
