import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userLocation } from './location';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // Load saved email on mount
  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    };
    loadEmail();
  }, []);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem('savedEmail', email); // Save email for next time
        Alert.alert('Success', 'Logged in!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', user.uid), {
          email: cred.user.email ?? '',
          username: '',
          quiz1: false, quiz1Score: 0,
          quiz2: false, quiz2Score: 0,
          quiz3: false, quiz3Score: 0,
          quiz4: false, quiz4Score: 0,
          alertsEnabled: false,
          checklist: {},
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        }, { merge: true });

        Alert.alert('Success', 'Account created!');
      }
    } catch (error) {
      Alert.alert('Error', 'Wrong Email or Password used. Please try again');
    }
  };

  const { location, permissionGranted, loading } = userLocation();
  if (loading) return <Text>Loading…</Text>;
  if (!permissionGranted) return <Text>Location permission not granted</Text>;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 114, 163, 0.7)', 'transparent']}
        style={styles.background}
      />
      <Text style={styles.header}>{isLogin ? '1ReadySG' : 'Sign Up'}</Text>
      <TextInput
        placeholder="Email (john@gmail.com)"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        placeholderTextColor="#c1c1c1"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#c1c1c1"
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </Text>
      </TouchableOpacity>
      <Text
        style={styles.toggle}
        onPress={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </Text>
    </View>
  );
};

// return (
//   <View>
//     <Text>Login Screen</Text>
//     <Button title="Login" onPress={() => navigation.replace('Main')} />
//   </View>
// );
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0072A3'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 400,
    height: '100%',
  },
  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    color: "white",
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 15,
    color: "white"
  },
  toggle: {
    marginTop: 15,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0072A3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
