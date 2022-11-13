import create from 'zustand';

interface GameState {
  stats: any;
  status: any;
  currentDecisionId: any;
  setStats: (newStats: any) => void;
  setStatus: (newStatus: any) => void;
  setCurrentDecisionId: (currentDecisionId: any) => void;
}

const useGameState = create<GameState>((set) => ({
  stats: false,
  status: false,
  currentDecisionId: false,
  setStats: (newStats) => {},
  setStatus: (newStatus) => {},
  setCurrentDecisionId: (currentDecisionId) => {},
}));

export default useGameState;
