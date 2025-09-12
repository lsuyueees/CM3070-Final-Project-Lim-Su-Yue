import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Profile = () => {
  const user = auth.currentUser;
  const [username, setUsername] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username || '');
        }
      };
      fetchUsername();
    }
  }, []);

  const saveUsername = async () => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { username }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesome5 name="user-circle" size={50} style={styles.icon} />

        <Text style={styles.biglabel}>Username</Text>
        <Text style={styles.text}>{username || 'Your username'}</Text>

        <Text style={styles.biglabel}>Email</Text>
        <Text style={styles.text}>{user?.email}</Text>

        <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />

        <Text style={styles.label}>Change your username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveUsername}>
          <Text style={styles.saveText}> Save</Text>
        </TouchableOpacity>

        {saved && <Text style={styles.success}>Changes saved</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAFC',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  icon: {
    color: '#0072A3',
    marginBottom: 20,
    alignSelf: 'center',
  },
  biglabel: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
    alignSelf: 'center'
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
    alignSelf: 'center'
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#0072A3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  success: {
    marginTop: 15,
    color: 'green',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Profile;
