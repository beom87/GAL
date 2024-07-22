import { create } from 'zustand';

type State = {
    history?: any[];
};

type Actions = {
    setHistory: (history: any[]) => void;
};

const useHistoryStore = create<State & Actions>((set) => ({
    setHistory: (history) => set({ history })
}));

export default useHistoryStore;
