import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocalState {
  password: string;
  savePassword: (newPassword: string) => void
}

export const useLocalStore = create(
  persist<LocalState>(
    (set) => ({
      password: "",
      savePassword: (newPassword: string) => set({ password: newPassword }),
    }),
    {
      name: "local-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);