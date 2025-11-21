import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { AuthContext } from "../context/AuthContext";

interface UserHeaderProps {
  title?: string;
}

const UserHeader = ({ title = "Selamat Datang," }: UserHeaderProps) => {
  const auth = useContext(AuthContext);

  const email = auth?.userInfo?.email || "Pengguna";

  return (
    <View style={styles.header}>
      <Text style={styles.welcome}>{title}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      {auth?.userToken && (
        <Text style={styles.infoText}>
          Token: {auth.userToken.substring(0, 10)}...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 3 },
    }),
  },
  welcome: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 22,
    fontWeight: "700",
    color: "#182848",
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    color: "#C0C0C0",
    marginTop: 8,
  },
});

export default UserHeader;
