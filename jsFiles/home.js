import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import WeatherAPI from './weatherAPI';
import ScenarioQuiz from './scenarioQuiz';

const Home = () => {
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Here's what's happening around you</Text>
        <WeatherAPI mapStyle={{ height: 300, width: 400, padding: 20 }}/>

        <TouchableOpacity onPress={() => navigation.navigate('Weather')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View Weather</Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', padding: 20, marginTop: 20 }}>Start Learning Today!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: "#0072A3",
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignSelf: 'flex-end', 
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold'
  }
});

export default Home;
