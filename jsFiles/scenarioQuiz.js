import React, { useState, useCallback, useEffect  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ScenarioQuiz = () => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Disaster Preparedness Scenario Quizzes</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});

export default ScenarioQuiz;
