import { create } from 'zustand';

type State = {
    focus: string;
};

type Actions = {
    setFocus: (focus: string) => void;
};

const useHomeStore = create<State & Actions>((set) => ({
    focus: '',
    setFocus: (focus) => set({ focus })
}));

export default useHomeStore;
