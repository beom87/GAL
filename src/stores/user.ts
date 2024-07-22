import { create } from 'zustand';

type State = {
    user?: any[];
};

type Actions = {
    setUser: (user: any[]) => void;
};

const useUserStore = create<State & Actions>((set) => ({
    setUser: (user) => set({ user })
}));

export default useUserStore;
