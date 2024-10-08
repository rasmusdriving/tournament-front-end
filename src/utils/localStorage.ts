import { Tournament, Team, Player, Match, Bet } from '../types';

const STORAGE_KEY = 'tournamentTracker';

interface AppState {
  tournaments: Tournament[];
  matches: Match[];
  bets: Bet[];
}

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return { tournaments: [], matches: [], bets: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { tournaments: [], matches: [], bets: [] };
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};