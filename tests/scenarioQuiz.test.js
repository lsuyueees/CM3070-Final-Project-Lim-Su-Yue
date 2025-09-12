import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ScenarioQuiz from '../jsFiles/scenarioQuiz';
import { getDoc } from 'firebase/firestore';

describe('ScenarioQuiz unlocking', () => {
  beforeEach(() => jest.clearAllMocks());

  it('locks Quiz 2 when quiz1=false', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ quiz1: false, quiz2: false, quiz3: false, quiz4: false }),
    });

    const { getByText } = render(<ScenarioQuiz />);

    await waitFor(() => {
      expect(getByText(/🔒 Quiz 2/i)).toBeTruthy();
    });
  });

  it('unlocks Quiz 2 when quiz1=true', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ quiz1: true, quiz2: false, quiz3: false, quiz4: false }),
    });

    const { getByText, queryByText } = render(<ScenarioQuiz />);

    await waitFor(() => {
      expect(queryByText(/🔒 Quiz 2/i)).toBeNull();
      expect(getByText(/Quiz 2/i)).toBeTruthy();
    });
  });
});
