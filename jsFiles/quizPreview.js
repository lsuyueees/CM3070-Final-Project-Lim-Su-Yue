import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const QuizPreview = ({ refreshTrigger }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgress();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const [progress, setProgress] = useState({
    quiz1: false,
    quiz2: false,
    quiz3: false,
    quiz4: false,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProgress({
          quiz1: data.quiz1 === true,
          quiz2: data.quiz2 === true,
          quiz3: data.quiz3 === true,
          quiz4: data.quiz4 === true,
        });
      }
    };

    fetchProgress();
  }, [refreshTrigger]);

  const quizList = [
    { key: 'quiz1', label: 'Quiz 1' },
    { key: 'quiz2', label: 'Quiz 2' },
    { key: 'quiz3', label: 'Quiz 3' },
    { key: 'quiz4', label: 'Quiz 4' },
  ];

  return (
    <View style={{ padding: 16 }}>
      <ScrollView contentContainerStyle={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {quizList.map((quiz) => (
          <TouchableOpacity
            key={quiz.key}
            style={[styles.card, !progress[quiz.key] && styles.locked]}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.cardText}>
              {progress[quiz.key] ? `${quiz.label} ✅` : `🔒 ${quiz.label}`}
            </Text>
            <FontAwesome5 name="arrow-right" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuizPreview;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locked: {
    backgroundColor: '#ddd',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
