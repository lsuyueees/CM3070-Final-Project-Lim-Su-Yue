import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import NotificationOption from './notification';

const MoreMenu = () => {

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
        <View style={styles.top}>
          <View style={styles.content}>
            <FontAwesome5 name="user" size={24} />
            <Text style={styles.cardText}>Go To Profile</Text>
          </View>
          <FontAwesome5 name="angle-right" size={24} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.top}>
          <View style={styles.content}>
            <FontAwesome5 name="award" size={24} />
            <Text style={styles.cardText}>Hall of Fame</Text>
          </View>
          <FontAwesome5 name="angle-right" size={24} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.top}>
          <View style={styles.content}>
            <FontAwesome5 name="question-circle" size={24} />
            <Text style={styles.cardText}>Help</Text>
          </View>
          <FontAwesome5 name="angle-right" size={24} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.top}>
          <View style={styles.content}>
            <FontAwesome5 name="bell" size={24} />
            <Text style={styles.cardText}>Notifications for Weather Alert</Text>
          </View>
          <NotificationOption />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={24} color="red" />
        <Text style={[styles.cardText, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ffecec',
  },
  cardText: {
    marginLeft: 15,
    fontSize: 18,
  },
});

export default MoreMenu;
