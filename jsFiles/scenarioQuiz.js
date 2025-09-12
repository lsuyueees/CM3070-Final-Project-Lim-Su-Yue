import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ScenarioQuiz = ({ refreshTrigger }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [quizProgress, setQuizProgress] = useState({
    quiz1: false,
    quiz2: false,
    quiz3: false,
    quiz4: false,
  });
  const [achievements, setAchievements] = useState([]);

  const fetchProgress = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const newProgress = {
          quiz1: data.quiz1 === true,
          quiz2: data.quiz2 === true,
          quiz3: data.quiz3 === true,
          quiz4: data.quiz4 === true,
        };
        setQuizProgress(newProgress);

        const badges = [];
        if (newProgress.quiz1) badges.push('Master Preparer');
        if (newProgress.quiz2) badges.push('Storm Safety');
        if (newProgress.quiz3) badges.push('Power Savvy');
        if (newProgress.quiz4) badges.push('Flood Smart');
        setAchievements(badges);
      }
    } catch (e) {
      console.log('fetchProgress error:', e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgress();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProgress();
    }, [])
  );

  useEffect(() => {
    if (refreshTrigger !== undefined) fetchProgress();
  }, [refreshTrigger]);

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Text style={styles.title}>Achievements</Text>
      <View style={styles.badgeContainer}>
        {achievements.length === 0 ? (
          <Text style={styles.lockedText}>No badges yet. Complete quizzes to earn badges!</Text>
        ) : (
          achievements.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <FontAwesome5 name="medal" size={18} color="#FFD700" />
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle}>Disaster Preparedness Quizzes</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Quiz1')}
      >
        <Text style={styles.cardTitle}>
          Quiz 1 {quizProgress.quiz1 ? '✅' : ''}
        </Text>
        <FontAwesome5 name="arrow-right" size={16} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, !quizProgress.quiz1 && styles.cardLocked]}
        onPress={() => {
          if (quizProgress.quiz1) navigation.navigate('Quiz2');
        }}
        disabled={!quizProgress.quiz1}
      >
        <Text style={styles.cardTitle}>
          {quizProgress.quiz1 ? `Quiz 2 ${quizProgress.quiz2 ? '✅' : ''}` : '🔒 Quiz 2'}
        </Text>
        {quizProgress.quiz1 && <FontAwesome5 name="arrow-right" size={16} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, !quizProgress.quiz2 && styles.cardLocked]}
        onPress={() => {
          if (quizProgress.quiz2) navigation.navigate('Quiz3');
        }}
        disabled={!quizProgress.quiz2}
      >
        <Text style={styles.cardTitle}>
          {quizProgress.quiz2 ? `Quiz 3 ${quizProgress.quiz3 ? '✅' : ''}` : '🔒 Quiz 3'}
        </Text>
        {quizProgress.quiz2 && <FontAwesome5 name="arrow-right" size={16} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, !quizProgress.quiz3 && styles.cardLocked]}
        onPress={() => {
          if (quizProgress.quiz3) navigation.navigate('Quiz4');
        }}
        disabled={!quizProgress.quiz3}
      >
        <Text style={styles.cardTitle}>
          {quizProgress.quiz3 ? `Quiz 4 ${quizProgress.quiz4 ? '✅' : ''}` : '🔒 Quiz 4'}
        </Text>
        {quizProgress.quiz3 && <FontAwesome5 name="arrow-right" size={16} />}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4CC',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#333',
  },
  lockedText: {
    color: '#888',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#e6f2ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLocked: {
    backgroundColor: '#ccc',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScenarioQuiz;
