import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

interface UserHeaderProps {
  title?: string;
}

const UserHeader = ({ title = "Selamat Datang," }: UserHeaderProps) => {
  const auth = useContext(AuthContext);
  const { colors } = useTheme();

  const email = auth?.userInfo?.email || "Pengguna";

  return (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <Text style={[styles.welcome, { color: colors.subtleText }]}>
        {title}
      </Text>
      <Text style={[styles.userEmail, { color: colors.secondary }]}>
        {email}
      </Text>
      {auth?.userToken && (
        <Text style={[styles.infoText, { color: colors.subtleText }]}>
          Token: {auth.userToken.substring(0, 10)}...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
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
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    marginTop: 8,
  },
});

export default UserHeader;