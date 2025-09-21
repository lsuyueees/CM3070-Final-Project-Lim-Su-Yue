import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const Quiz1 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const correctAnswer = 'B';

  const options = [
    { label: 'A', text: 'Ignore evacuation orders' },
    { label: 'B', text: 'Prepare an emergency kit in advance' },
    { label: 'C', text: 'Wait until the last minute to act' },
  ];

  const handleSubmit = async () => {
    if (!selectedOption) {
      Alert.alert('Choose an option', 'Please select one answer.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not logged in', 'Please log in again.');
      return;
    }

    const isCorrect = selectedOption === correctAnswer;
    const ref = doc(db, 'users', user.uid);

    try {
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, { email: user.email ?? '', createdAt: serverTimestamp() }, { merge: true });
      }

      await setDoc(
        ref,
        { quiz1: isCorrect, quiz1Score: isCorrect ? 1 : 0 },
        { merge: true }
      );

      Alert.alert(isCorrect ? 'Correct' : 'Incorrect', 'Returning to quizzes.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.log('Quiz1 save error:', e?.code, e?.message, e);
      Alert.alert('Error', e?.message ?? 'Could not save your result.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What should you do to prepare for a disaster?</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          style={[
            styles.option,
            selectedOption === option.label && styles.selected,
          ]}
          onPress={() => setSelectedOption(option.label)}
        >
          <Text>{option.label}. {option.text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.submitButton, !selectedOption && { backgroundColor: 'gray' }]}
        onPress={handleSubmit}
        disabled={!selectedOption}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quiz1;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  option: {
    borderWidth: 1,
    borderColor: '#0072A3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  selected: { backgroundColor: '#cce6ff' },
  submitButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#0072A3',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: 'white', fontWeight: '600', fontSize: 16 },
});
