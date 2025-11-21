
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

interface UserHeaderProps {
  title?: string; 
}

const UserHeader = ({ title = "Selamat Datang," }: UserHeaderProps) => {
  const auth = useContext(AuthContext);
  
  if (!auth || !auth.userInfo) return null; 

  return (
    <View style={styles.header}>
      <Text style={styles.welcome}>{title}</Text>
      <Text style={styles.userEmail}>{auth.userInfo.email}</Text>
      <Text style={styles.infoText}>
        Token: {auth.userToken?.substring(0, 10)}...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  welcome: { 
    fontSize: 14, 
    color: '#666' 
  },
  userEmail: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  infoText: { 
    fontSize: 12, 
    color: '#999', 
    marginTop: 5 
  }
});

export default UserHeader;