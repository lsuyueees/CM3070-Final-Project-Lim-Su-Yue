import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert, Platform } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

const NotificationOption = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Configure handler once (optional; can be elsewhere)
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    let alive = true;

    const init = async () => {
      try {
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.DEFAULT,
          });
        }

        const user = auth.currentUser;
        if (!user) { if (alive) setLoading(false); return; }

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        // If field missing, treat as false (do NOT write anything)
        const enabled = snap.exists() ? !!snap.data().alertsEnabled : false;
        if (alive) setIsEnabled(enabled);
      } catch (e) {
        console.log('Fetch alertsEnabled error:', e);
      } finally {
        if (alive) setLoading(false);
      }
    };

    init();
    return () => { alive = false; };
  }, []);

  const requestPushPermission = async () => {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
      return true;
    }
    const req = await Notifications.requestPermissionsAsync();
    return req.granted || req.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
  };

  const handleToggle = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not signed in', 'Please log in to change notification settings.');
      return;
    }

    const nextValue = !isEnabled; // flip

    // Optimistic UI
    setIsEnabled(nextValue);

    try {
      if (nextValue) {
        // Turning ON: ask permission only now
        const ok = await requestPushPermission();
        if (!ok) {
          setIsEnabled(false); // revert
          Alert.alert('Permission needed', 'Enable notifications in Settings to receive alerts.');
          return;
        }

        await setDoc(doc(db, 'users', user.uid), { alertsEnabled: true }, { merge: true });

        // Optional small confirmation (local) – remove if you prefer silence
        await Notifications.scheduleNotificationAsync({
          content: { title: 'Weather Alerts Enabled', body: 'You will now receive rainfall alerts.' },
          trigger: null,
        });
      } else {
        // Turning OFF
        await setDoc(doc(db, 'users', user.uid), { alertsEnabled: false }, { merge: true });
        // Optional: cancel any scheduled local notifications
        try { await Notifications.cancelAllScheduledNotificationsAsync(); } catch { }
      }
    } catch (e) {
      console.log('Toggle alertsEnabled error:', e);
      setIsEnabled(!nextValue); // rollback on error
      Alert.alert('Error', 'Could not update notification setting. Please try again.');
    }
  };

  return (
    <View>
      <Switch
        value={isEnabled}
        onValueChange={handleToggle}
        trackColor={{ false: '#ccc', true: '#0072A3' }}
        thumbColor={isEnabled ? '#fff' : '#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationOption;
