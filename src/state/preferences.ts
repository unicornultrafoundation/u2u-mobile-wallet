import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PreferenceState {
  darkMode: boolean;
  toggleDarkMode: () => void
  showBalance: boolean;
  toggleShowBalance: () => void
}

export const usePreferenceStore = create<PreferenceState>()(
  persist<PreferenceState>(
    (set, get) => ({
      darkMode: true,
      toggleDarkMode: () => set({ darkMode: !(get().darkMode) }),
      showBalance: true,
      toggleShowBalance: () => set({ showBalance: !(get().showBalance) }),
    }),
    {
      name: "preference-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)