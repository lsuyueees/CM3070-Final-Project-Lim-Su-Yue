import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NotificationOption from '../jsFiles/notification';
import * as Notifications from 'expo-notifications';
import { getDoc, setDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

describe('NotificationOption', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.currentUser = { uid: 'testUID', email: 'user@test.com' };
  });

  it('loads alertsEnabled=false by default when missing', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({}) });
    const { getByRole } = render(<NotificationOption />);
    const sw = await waitFor(() => getByRole('switch'));
    expect(sw.props.value).toBe(false);
  });

  it('enables notifications and persists to Firestore (requests permission)', async () => {
    // Make sure permission is NOT already granted so request is called
    Notifications.getPermissionsAsync.mockResolvedValueOnce({ granted: false, ios: { status: 0 } });
    Notifications.requestPermissionsAsync.mockResolvedValueOnce({ granted: true, ios: { status: 3 } });

    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ alertsEnabled: false }) });

    const { getByRole } = render(<NotificationOption />);
    const sw = await waitFor(() => getByRole('switch'));

    // Provide next boolean value to Switch
    fireEvent(sw, 'valueChange', true);

    await waitFor(() => {
      expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalledWith(
        { __col: 'users', __id: 'testUID' },
        { alertsEnabled: true },
        { merge: true }
      );
    });
  });

  it('disables notifications and persists to Firestore', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ alertsEnabled: true }) });

    const { getByRole } = render(<NotificationOption />);
    const sw = await waitFor(() => getByRole('switch'));

    fireEvent(sw, 'valueChange', false);

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(
        { __col: 'users', __id: 'testUID' },
        { alertsEnabled: false },
        { merge: true }
      );
    });
  });
});
