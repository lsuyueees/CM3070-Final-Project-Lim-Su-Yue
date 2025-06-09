import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const WeatherAPI = ({ mapStyle }) => {

  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/rainfall');
        const json = await response.json();

        const stations = json.metadata.stations;
        const readings = json.items[0]?.readings || [];
        const readingTimestamp = json.items[0]?.timestamp;
        setTimestamp(readingTimestamp);

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
  }, []);

  const getColor = (value) => {
    if (value > 20) return 'red';
    if (value > 10) return 'orange';
    return 'green';
  };

  if (!location) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

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
      </MapView>

      <View style={styles.legend}>
        <Text style={{ color: 'green' }}>🟢 Low</Text>
        <Text style={{ color: 'orange' }}>🟠 Medium</Text>
        <Text style={{ color: 'red' }}>🔴 High</Text>
        <Text style={{ marginTop: 4, fontSize: 12 }}>
          Last updated: {timestamp ? new Date(timestamp).toLocaleString() : 'Loading...'}
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

