// location.js
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { AppState } from 'react-native';

export function userLocation() {
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestAndFetch = async () => {
    try {
      // First check existing permission
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const res = await Location.requestForegroundPermissionsAsync();
        if (!res.granted) {
          setPermissionGranted(false);
          setLoading(false);
          return;
        }
      }
      setPermissionGranted(true);

      // Get the coordinates
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (e) {
      console.log('Location error:', e);
      setPermissionGranted(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAndFetch();

    // Optional: re-check when app comes back from background
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        requestAndFetch();
      }
    });
    return () => sub.remove();
  }, []);

  return { location, permissionGranted, loading };
}
