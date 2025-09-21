import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import MoreStackNavigation from './jsFiles/moreStackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthScreen from './jsFiles/authentication';
import WeatherAPI from './jsFiles/weatherAPI';
import SOSList from './jsFiles/sosList';
import Home from './jsFiles/home';
import ScenarioQuiz from './jsFiles/scenarioQuiz';
import MoreMenu from './jsFiles/more';
import Profile from './jsFiles/profile';
import QuizStackNavigation from './jsFiles/quizStackNavigation';

// // Clear cache once
// // 1. Uncomment lines 27-29 and run npm start
// // 2. After running, terminate program and comment lines 27-29
// // 3. Run npm start again and use the app as per normal
// AsyncStorage.removeItem('savedEmail')
//   .then(() => console.log('Saved email cleared!'))
//   .catch((e) => console.log('Error clearing saved email:', e));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0072A3',
          height: 130
        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 25,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="1ReadySG"
        component={HomeScreen}
        options={{
          lazy: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          lazy: false,
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cloud-sun-rain" size={20} style={{ color }} />
          )
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          lazy: false,
          tabBarLabel: 'SOS',
          tabBarLabelStyle: {
            fontSize: 15,
            color: "red",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="exclamation" size={20} style={{ color: "red" }} />
          )
        }}
      />
      <Tab.Screen
        name="Learn"
        component={QuizStackNavigation}
        options={{
          headerShown: false,
          lazy: false,
          tabBarLabel: 'Learn',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book-reader" size={20} style={{ color }} />
          )
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigation}
        options={{
          headerShown: false,
          lazy: false,
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="ellipsis-h" size={20} style={{ color }} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
}

function WeatherScreen() {

  return (
    <View style={{ flex: 1 }}>
      <WeatherAPI mapStyle={{ flex: 1 }} />
    </View>
  );
}

function SOSScreen() {

  return (
    <View style={{ flex: 1 }}>
      <SOSList />
    </View>
  );
}

function LearnScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScenarioQuiz />
    </View>
  );
}

function MoreScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <MoreMenu />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        try {
          const ref = doc(db, 'users', u.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, {
              email: u.email ?? '',
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
          } else {
            await setDoc(ref, { lastLoginAt: serverTimestamp() }, { merge: true });
          }
        } catch (e) {
          console.log('Ensure user doc error:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MyTabs} />
          </>
        ) : (
          <Stack.Screen name="Authentication" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
