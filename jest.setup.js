import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { View, Text } from 'react-native';

// Basic RN Maps mock (prevents native render errors)
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = (props) => React.createElement(View, props, props.children);
  Mock.Marker = (props) => React.createElement(View, props, props.children);
  return Mock;
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
    useFocusEffect: (cb) => {
      // run the effect inside act to avoid warnings
      const { act } = require('@testing-library/react-native');
      act(() => { cb && cb(); });
    },
  };
});

// Expo Notifications mock
jest.mock('expo-notifications', () => {
  return {
    getPermissionsAsync: jest.fn(async () => ({ granted: true, ios: { status: 3 } })),
    requestPermissionsAsync: jest.fn(async () => ({ granted: true, ios: { status: 3 } })),
    setNotificationHandler: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    scheduleNotificationAsync: jest.fn(async () => ({})),
    cancelAllScheduledNotificationsAsync: jest.fn(async () => ({})),
    AndroidImportance: { DEFAULT: 3 },
    IosAuthorizationStatus: { PROVISIONAL: 3 },
  };
});

// Expo Location mock (we’ll override per-test as needed)
jest.mock('expo-location', () => {
  return {
    getForegroundPermissionsAsync: jest.fn(async () => ({ granted: true, status: 'granted' })),
    requestForegroundPermissionsAsync: jest.fn(async () => ({ granted: true, status: 'granted' })),
    getCurrentPositionAsync: jest.fn(async () => ({
      coords: { latitude: 1.3521, longitude: 103.8198 },
    })),
  };
});

// Firebase Firestore mock (modular API)
jest.mock('firebase/firestore', () => {
  return {
    doc: (db, col, id) => ({ __col: col, __id: id }),
    getDoc: jest.fn(async () => ({ exists: () => true, data: () => ({}) })),
    setDoc: jest.fn(async () => ({})),
    updateDoc: jest.fn(async () => ({})),
    serverTimestamp: () => new Date(),
  };
});

// Firebase Auth mock
jest.mock('firebase/auth', () => {
  return {
    onAuthStateChanged: jest.fn(() => () => { }),
  };
});

// If your modules re-export db/auth from firebaseConfig, you can stub them too:
jest.mock('./firebaseConfig', () => {
  return {
    auth: { currentUser: { uid: 'testUID', email: 'user@test.com' } },
    db: {}, // not used by our doc mock
  };
});

jest.mock('@expo/vector-icons/FontAwesome5', () => 'FontAwesome5');