import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Hr from 'react-native-hr-component';

import WeatherAPI from './weatherAPI';
import SOSList from './sosList';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions = {{
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
            tabBarLabel: 'SOS',
            tabBarLabelStyle: {
              fontSize: 15,
              color:"red",
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="exclamation" size={20} style={{ color:"red" }} />
            )
          }} 
        />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{
            tabBarLabel: 'Learn', 
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book-reader" size={20} style={{ color }} />
            )
          }} 
        />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
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
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Here's what's happening around you</Text>
      <WeatherAPI mapStyle={{ height: 300, width: '100%', padding: 20 }}/>
      <Button onPress={() => navigation.navigate('Weather')} style={{ width: 200, left: 80 }}>
        View Weather
      </Button>
      <Text style={{ fontWeight: 'bold', alignSelf: 'left', padding: 20, marginTop: 20 }}>Start Learning Today!</Text>
    </View>
  );
}

function WeatherScreen() {

   return (
    <View style={{ flex: 1 }}>
      <WeatherAPI mapStyle={{ flex: 1 }}/>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Learn Screen</Text>
      <Button onPress={() => navigation.navigate('1ReadySG')}>
        Go to Home
      </Button>
    </View>
  );
}

function MoreScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>More Screen</Text>
      <Button onPress={() => navigation.navigate('1ReadySG')}>Go to Home</Button>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  lineStyle:{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
   }
});
