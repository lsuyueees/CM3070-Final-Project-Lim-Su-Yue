import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Checklist from '../jsFiles/Checklist';
import { getDoc, updateDoc, setDoc } from 'firebase/firestore';

describe('Checklist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('toggles an item and persists checklist change', async () => {
    // Simulate no saved checklist (component will render defaults)
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({}) });

    const { getByTestId } = render(<Checklist />);

    // 1) Let initial load happen so default writes don’t race with the toggle
    await waitFor(() => {
      // initial Firestore read should occur
      expect(getDoc).toHaveBeenCalled();
    });

    // 2) Press the card wrapper (NOT the inner Text) so onPress fires
    const card = getByTestId('chk-item1');
    fireEvent.press(card);

    // 3) Wait for any write(s). Component may use updateDoc or setDoc(merge)
    await waitFor(() => {
      expect(updateDoc.mock.calls.length + setDoc.mock.calls.length).toBeGreaterThan(0);
    });

    // 4) Look across ALL writes and ensure at least one has item1 === true
    const writes = [
      ...updateDoc.mock.calls.map((args) => args[1]),                       // [ref, payload]
      ...setDoc.mock.calls.map((args) => args[1])                           // [ref, payload, {merge}]
    ].filter(Boolean);

    // Some components write defaults first, then the toggle.
    // We assert that at least ONE payload has checklist.item1 === true
    const anyToggledTrue = writes.some(
      (payload) => payload?.checklist && payload.checklist.item1 === true
    );

    expect(anyToggledTrue).toBe(true);
  });
});
