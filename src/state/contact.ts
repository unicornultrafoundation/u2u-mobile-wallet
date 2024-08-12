import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const CONTACT_STORE_KEY = 'contact-storage'

export interface Contact {
  name: string;
  address: string;
  avatar: string;
}

interface ContactState {
  contactList: Contact[],
  addContact: (contact: Contact) => void;
  removeContact: (walletAddress: string) => void;
}

export const useContactStore = create<ContactState>()(
  persist<ContactState>(
    (set, get) => ({
      contactList: [],
      addContact: (contact: Contact) => {
        const currentContact = get().contactList
        const index = currentContact.findIndex((i) => i.address.toLowerCase() === contact.address.toLowerCase())
        if (index === -1) {
          set({
            contactList: [...currentContact, contact]
          })
        } else {
          currentContact[index] = contact
          set({
            contactList: [...currentContact]
          })
        }
      },
      removeContact: (walletAddress: string) => {
        const currentContact = get().contactList
        set({
          contactList: currentContact.filter((i) => i.address.toLowerCase() !== walletAddress.toLowerCase())
        })
      }
    }),
    {
      name: CONTACT_STORE_KEY, // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);