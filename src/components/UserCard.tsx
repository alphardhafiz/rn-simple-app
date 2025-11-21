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
import { useTheme } from "../context/ThemeContext";

interface UserCardProps {
  data: User;
  onPress?: () => void;
  isDetail?: boolean;
}

const UserCard = ({ data, onPress, isDetail = false }: UserCardProps) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === "dark";
  const companyName = (data as any).company?.name;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        { backgroundColor: colors.card },
        isDetail && styles.detailCard,
        isDetail && {
          backgroundColor: isDark ? "#2A3A5A" : "#E0E7FF",
          borderColor: isDark ? "#4B6CB7" : "#A3B5FF",
        }
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Ionicons name="person" size={24} color="white" />
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>
          {data.name}
        </Text>
        <Text style={[styles.email, { color: colors.primary }]}>
          {data.email}
        </Text>
        {isDetail && companyName && (
          <Text style={[styles.company, { color: colors.subtleText }]}>
            🏢 {companyName}
          </Text>
        )}
      </View>
      {!isDetail && (
        <Ionicons 
          name="chevron-forward-outline" 
          size={20} 
          color={colors.subtleText} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
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
    elevation: 0,
    borderWidth: 1,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  info: { flex: 1 },
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    marginTop: 2,
  },
  company: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default UserCard;