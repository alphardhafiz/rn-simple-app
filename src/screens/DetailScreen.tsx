import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList, User } from "../types";
import UserCard from "../components/UserCard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { colors, scheme } = useTheme();
  const item: User = route.params.item;
  const isDark = scheme === "dark";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <UserCard data={item} isDetail={true} />

      <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: isDark ? "#2A3A5A" : "#E0E7FF" },
          ]}
        >
          <Ionicons name="call-outline" size={24} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[styles.label, { color: colors.subtleText }]}>
            Phone
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {item.phone}
          </Text>
        </View>
      </View>

      <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: isDark ? "#2A3A5A" : "#E0E7FF" },
          ]}
        >
          <Ionicons name="globe-outline" size={24} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[styles.label, { color: colors.subtleText }]}>
            Website
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {item.website}
          </Text>
        </View>
      </View>

      <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: isDark ? "#2A3A5A" : "#E0E7FF" },
          ]}
        >
          <Ionicons name="location-outline" size={24} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[styles.label, { color: colors.subtleText }]}>
            Address
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {item.address?.street}, {item.address?.suite}, {item.address?.city}
            {item.address?.zipcode && ` ${item.address.zipcode}`}
          </Text>
        </View>
      </View>

      {item.company && (
        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isDark ? "#2A3A5A" : "#E0E7FF" },
            ]}
          >
            <Ionicons
              name="business-outline"
              size={24}
              color={colors.primary}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={[styles.label, { color: colors.subtleText }]}>
              Company
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {item.company.name}
            </Text>
            {item.company.catchPhrase && (
              <Text style={[styles.subValue, { color: colors.subtleText }]}>
                "{item.company.catchPhrase}"
              </Text>
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
    padding: 15,
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 3,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  subValue: {
    fontSize: 13,
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default DetailScreen;
