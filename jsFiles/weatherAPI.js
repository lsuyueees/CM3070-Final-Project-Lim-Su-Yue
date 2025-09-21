import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Button, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

import { userLocation } from './location';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const WeatherAPI = ({ mapStyle, refreshTrigger }) => {

  const { location, permissionGranted, loading } = userLocation();
  const [weatherData, setWeatherData] = useState([]);
  const [timestamp, setTimestamp] = useState(null);

  const noti_Timing = 30 * 60 * 1000; // 30 mins
  const lastNotifyRef = useRef(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/rainfall');
        const json = await response.json();

        const stations = json.data.stations;
        const readings = json.data.readings?.[0]?.data || [];
        const readingTimestamp = json.data.readings?.[0]?.timestamp;
        setTimestamp(readingTimestamp);

        const totalRain = readings.reduce((sum, reading) => sum + (reading.value || 0), 0);
        const isRaining = totalRain > 0;

        let alertsEnabled = false;
        if (user) {
          const snap = await getDoc(doc(db, 'users', user.uid));
          alertsEnabled = !!snap.data()?.alertsEnabled;
        }
        if (alertsEnabled) {
          const now = Date.now();
          if (now - lastNotifyRef.current >= noti_Timing) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: isRaining ? 'Rainfall Alert' : 'No Rain Detected',
                body: isRaining ? 'It is currently raining in your area.' : 'Skies are clear at the moment.',
              },
              trigger: null,
            });
            lastNotifyRef.current = now;
          }
        }

        const merged = stations.map((station) => {
          const reading = readings.find((r) => r.station_id === station.id);
          return {
            id: station.id,
            name: station.name,
            labelLocation: station.location,
            value: reading?.value ?? 0,
          };
        });

        setWeatherData(merged);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Re-fetch every 60 seconds

    return () => clearInterval(interval);
  }, [refreshTrigger, location]);

  const getColor = (value) => {
    if (value > 20) return 'red';
    if (value > 10) return 'orange';
    return 'green';
  };

  if (loading) return <Text>Loading…</Text>;

  if (!permissionGranted) {
    return <Text>Location permission not granted</Text>;
  }

  if (!location) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  const customPins = [
    {
      id: 'flood1',
      name: 'Ang Mo Kio Ave 3',
      coords: { latitude: 1.3693, longitude: 103.8559 },
    },
    {
      id: 'flood2',
      name: 'Ang Mo Kio Ave 8 Junction',
      coords: { latitude: 1.3722, longitude: 103.8483 },
    },
    {
      id: 'flood3',
      name: 'Bedok North Ave 4',
      coords: { latitude: 1.334774, longitude: 103.943387 },
    },
    {
      id: 'flood4',
      name: 'Upper Changi Road Junction',
      coords: { latitude: 1.334332, longitude: 103.950717 },
    },
    {
      id: 'flood5',
      name: 'Bukit Timah Road',
      coords: { latitude: 1.3722, longitude: 103.788938 },
    },
    {
      id: 'flood7',
      name: 'Cavenagh Road',
      coords: { latitude: 1.308029, longitude: 103.842104 },
    },
    {
      id: 'flood8',
      name: 'Kramat Lane',
      coords: { latitude: 1.300982, longitude: 103.842268 },
    },
    {
      id: 'flood9',
      name: 'Craig Road',
      coords: { latitude: 1.277794, longitude: 103.842334 },
    },
    {
      id: 'flood10',
      name: 'Tg Pagar Road Junction',
      coords: { latitude: 1.276334, longitude: 103.843401 },
    },
    {
      id: 'flood11',
      name: 'Dunearn Road',
      coords: { latitude: 1.335464, longitude: 103.785253 },
    },
    {
      id: 'flood12',
      name: 'Dunearn Road',
      coords: { latitude: 1.325830, longitude: 103.808492 },
    },
    {
      id: 'flood13',
      name: 'Eng Neo Avenue',
      coords: { latitude: 1.332884, longitude: 103.798197 },
    },
    {
      id: 'flood14',
      name: 'Enterprise Road',
      coords: { latitude: 1.333321, longitude: 103.705272 },
    },
    {
      id: 'flood15',
      name: 'Hougang Ave 8',
      coords: { latitude: 1.375224, longitude: 103.888885 },
    },
    {
      id: 'flood16',
      name: 'Jalan Boon Lay',
      coords: { latitude: 1.329188, longitude: 103.708128 },
    },
    {
      id: 'flood17',
      name: 'Jalan Nipah',
      coords: { latitude: 1.325836, longitude: 103.952601 },
    },
    {
      id: 'flood18',
      name: 'Jurong East Street 32',
      coords: { latitude: 1.347338, longitude: 103.733607 },
    },
    {
      id: 'flood19',
      name: 'Kampong Ampat',
      coords: { latitude: 1.334586, longitude: 103.883144 },
    },
    {
      id: 'flood20',
      name: 'Lorong 1 and 2 Toa Payoh Junction',
      coords: { latitude: 1.340849, longitude: 103.847031 },
    },
    {
      id: 'flood21',
      name: 'Lorong Gambir',
      coords: { latitude: 1.345746, longitude: 103.875465 },
    },
    {
      id: 'flood22',
      name: 'Lorong Kismis',
      coords: { latitude: 1.337450, longitude: 103.768556 },
    },
    {
      id: 'flood23',
      name: 'Punggol Way',
      coords: { latitude: 1.400696, longitude: 103.896477 },
    },
    {
      id: 'flood24',
      name: 'Seletar North Link',
      coords: { latitude: 1.424136, longitude: 103.884814 },
    },
    {
      id: 'flood25',
      name: 'Upper Changi Road East',
      coords: { latitude: 1.338319, longitude: 103.960145 },
    },
    {
      id: 'flood26',
      name: 'Upper Paya Lebar Road',
      coords: { latitude: 1.344436, longitude: 103.882253 },
    },
    {
      id: 'flood27',
      name: 'Yishun Ave 2',
      coords: { latitude: 1.426891, longitude: 103.835243 },
    },
    {
      id: 'flood28',
      name: 'Yishun Ave 5',
      coords: { latitude: 1.430168, longitude: 103.827104 },
    },
    {
      id: 'flood29',
      name: 'Yishun Ave 7',
      coords: { latitude: 1.439531, longitude: 103.835820 },
    },
    {
      id: 'flood30',
      name: 'Kings Road',
      coords: { latitude: 1.321712, longitude: 103.809635 },
    },
  ];

  return (
    <View style={mapStyle}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {weatherData.map((station) => (
          <Marker
            key={station.id}
            coordinate={station.labelLocation}
            title={station.name}
            description={`Rainfall: ${station.value} mm${station.value === 0 ? ' (No rain)' : ''}`}
            pinColor={getColor(station.value)}
          />
        ))}

        {customPins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={pin.coords}
            title={pin.name}
            pinColor="black"
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <Text style={{ color: 'black' }}><FontAwesome5 name="square-full" size={16} style={{ color: 'green' }} /> Low/No Rainfall</Text>
        <Text style={{ color: 'black' }}><FontAwesome5 name="square-full" size={16} style={{ color: 'orange' }} /> Moderate Rainfall</Text>
        <Text style={{ color: 'black' }}><FontAwesome5 name="square-full" size={16} style={{ color: 'red' }} /> Heavy Rainfall</Text>
        <Text><FontAwesome5 name="exclamation-triangle" size={16} /> Flood Hotspot (as of 14 May 2025)</Text>
        <Text style={{ marginTop: 4, fontSize: 12 }}>
          Last updated: {timestamp ? new Date(timestamp).toLocaleString('en-SG') : 'Loading...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },

});

export default WeatherAPI;

