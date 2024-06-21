// src/app/store/userStore.ts
import { create } from 'zustand';

interface UserState {
  username: string;
  lastname: string;
  email: string;
  password: string;
  error: string;
  setUsername: (name: string) => void;
  setLastname: (lastname: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  lastname: '',
  email: '',
  password: '',
  error: '',
  setUsername:(username) => set({username}),
  setLastname:(lastname) => set({lastname}),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setError: (error) => set({ error }),
}));

export default useUserStore;
