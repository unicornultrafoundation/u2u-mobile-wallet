import { useMemo } from "react"
import { useContactStore } from "../state/contact"

export const useContact = (search?: string) => {
  const {contactList, addContact, removeContact} = useContactStore()

  const filtered = useMemo(() => {
    return contactList.filter((item) => {
      if (!search || search === '') return true
      return item.address.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [contactList, search])

  return {
    contactList: filtered,
    addContact,
    removeContact
  }
}