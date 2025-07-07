import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HISTORY_STORE_KEY = 'history-storage'

interface HistoryItem {
  url: string;
  title: string;
  description: string;
  image: string;
  createdAt: number;
}

interface HistoryState {
  history: HistoryItem[];
  addHistory: (history: HistoryItem) => void;
  removeHistory: (history: HistoryItem) => void;
  searchHistory: (query: string) => HistoryItem[];
}

export const useHistoryStore = create<HistoryState>()(
  persist<HistoryState>(
    (set, get) => ({
      history: [],
      addHistory: (history: HistoryItem) => {
        set((state) => ({ history: [...state.history, history] }))
      },
      removeHistory: (history: HistoryItem) => {
        set((state) => ({ history: state.history.filter((item) => item.url !== history.url) }))
      },
      searchHistory: (query: string) => {
        return get().history.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      }
    }),
    {
      name: HISTORY_STORE_KEY, // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)