import { create } from 'zustand'

interface PreferenceState {
  darkMode: boolean;
  toggleDarkMode: () => void
}

export const usePreferenceStore = create<PreferenceState>((set, get) => ({
  darkMode: true,
  toggleDarkMode: () => set({ darkMode: !(get().darkMode) }),
}))