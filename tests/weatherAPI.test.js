import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WeatherAPI from '../jsFiles/weatherAPI';
import * as Location from 'expo-location';

const mockRain = (stations, readings, timestamp = '2024-07-17T14:00:00.000Z') => {
  global.fetch = jest.fn(async () => ({
    json: async () => ({
      code: 1,
      data: {
        stations,
        readings: [{ timestamp, data: readings }],
        readingType: 'TB1 Rainfall 5 Minute Total F',
        readingUnit: 'mm',
      },
    }),
  }));
};

const buildFetchResponse = (stations, readings, timestamp = '2024-07-17T14:00:00.000Z') => ({
  json: async () => ({
    code: 1,
    data: {
      stations,
      readings: [{ timestamp, data: readings }],
      readingType: 'TB1 Rainfall 5 Minute Total F',
      readingUnit: 'mm',
    },
  }),
});

describe('WeatherAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows not granted message when permission is denied', async () => {
    Location.getForegroundPermissionsAsync.mockResolvedValueOnce({ granted: false, status: 'denied' });
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ granted: false, status: 'denied' });
    mockRain([], []);

    // Ensure fetch is at least defined even if not called
    jest.spyOn(global, 'fetch').mockResolvedValue(buildFetchResponse([], []));

    const { getByText } = render(<WeatherAPI mapStyle={{ flex: 1 }} />);
    await waitFor(() => {
      // Match your component's exact copy:
      expect(getByText(/Location permission not granted/i)).toBeTruthy();
    });
  });

  it('renders rainfall markers and legend when granted', async () => {
    Location.getForegroundPermissionsAsync.mockResolvedValueOnce({ granted: true, status: 'granted' });
    Location.getCurrentPositionAsync.mockResolvedValueOnce({ coords: { latitude: 1.35, longitude: 103.82 } });

    mockRain(
      [{ id: 'S111', name: 'Scotts Road', location: { latitude: 1.31055, longitude: 103.8365 } }],
      [{ station_id: 'S111', value: 12 }]
    );

    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        buildFetchResponse(
          [{ id: 'S111', name: 'Scotts Road', location: { latitude: 1.31055, longitude: 103.8365 } }],
          [{ station_id: 'S111', value: 12 }]
        )
      );

    const { getByText } = render(<WeatherAPI mapStyle={{ flex: 1 }} />);

    await waitFor(() => {
      // Legend shows
      expect(getByText(/Last updated:/i)).toBeTruthy();
    });
  });
});
