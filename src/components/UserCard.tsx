import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { User } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface UserCardProps {
  data: User;
  onPress?: () => void;
  isDetail?: boolean;
}

const UserCard = ({ data, onPress, isDetail = false }: UserCardProps) => {
  const companyName = (data as any).company?.name;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, isDetail && styles.detailCard]}
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="white" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.email}>{data.email}</Text>
        {isDetail && companyName && (
          <Text style={styles.company}>🏢 {companyName}</Text>
        )}
      </View>
      {!isDetail && (
        <Ionicons name="chevron-forward-outline" size={20} color="#B0B0B0" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  detailCard: {
    backgroundColor: "#E0E7FF",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#A3B5FF",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B6CB7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  info: { flex: 1 },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#4B6CB7",
    marginTop: 2,
  },
  company: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});

export default UserCard;
