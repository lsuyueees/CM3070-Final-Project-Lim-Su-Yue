import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import WeatherAPI from './weatherAPI';
import QuizPreview from './quizPreview';
import Checklist from './checklist';

const Home = () => {

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTrigger(prev => !prev);  // Toggle value to force refresh in child components
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.headers}>Here's what's happening around you</Text>

        <WeatherAPI mapStyle={{ height: 300, width: 400, padding: 20 }} refreshTrigger={refreshTrigger} />

        <TouchableOpacity onPress={() => navigation.navigate('Weather')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View Weather</Text>
        </TouchableOpacity>

        <Text style={styles.headers}>Start Learning Today!</Text>
        <QuizPreview refreshTrigger={refreshTrigger} />

        <Text style={styles.headers}>Emergency Bag Checklist</Text>
        <Checklist />
        
        <View style={styles.checklistPoints}>
          <Text style={{ fontWeight: 'bold'}}>Points to Note of the Emergency Bag{"\n"}</Text>
          <Text>You may have more than one Ready Bag, e.g. one for each family member.{"\n"}</Text>
          <Text>Do not pack bulky items into the Ready Bag as it may hamper movement during an emergency.{"\n"}</Text>
          <Text>Check expiry dates of perishable items in the bag and replace them when needed.{"\n"}</Text>
          <Text>Periodically replace batteries with new ones and do not place them inside devices e.g. torchlight.{"\n"}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headers: {
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 50
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
  },
  checklistPoints: {
    padding: 20,
  }
});

export default Home;
