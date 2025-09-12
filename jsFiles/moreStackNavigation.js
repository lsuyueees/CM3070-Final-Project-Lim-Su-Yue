import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoreMenu from './more';
import Profile from './profile';

const MoreStack = createStackNavigator();

function MoreStackNavigation() {
  return (
    <MoreStack.Navigator 
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
      }}
    >
      <MoreStack.Screen
        name="More"
        component={MoreMenu}
        options={{ 
          title: 'More' 
        }}
      />
      <MoreStack.Screen 
        name="Profile" 
        component={Profile}
        options={{  
          title: 'Profile',
          headerTintColor: 'white',
        }} 
      />
    </MoreStack.Navigator>
  );
}

export default MoreStackNavigation;
