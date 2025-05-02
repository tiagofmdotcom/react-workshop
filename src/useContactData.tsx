// useContactData.js
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState(null);
  const [refetchContacts, setRefetchContacts] = useState(false);

  useEffect(() => {
    if (!refetchContacts) return;

    const fetchContacts = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
      setContacts(data);
      setRefetchContacts(false);
    };

    fetchContacts();
  }, [refetchContacts]);

  const contactsWithPhotos = useMemo(() => {
    if (!contacts) return null;

    return contacts.map((contact) => {
      const gender = contact.id % 2 === 0 ? 'men' : 'women';
      return { photo: `https://randomuser.me/api/portraits/${gender}/${contact.id}.jpg`, ...contact };
    });
  }, [contacts]);

  const handleRemove = (email) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  };

  const addContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const updateContact = (contact) => {
    setContacts((prevContacts) => prevContacts.map((c) => (c.id === contact.id ? contact : c)));
  };

  return (
    <ContactContext.Provider value={{
      contacts: contactsWithPhotos,
      handleRemove,
      refetchContacts: () => setRefetchContacts(true),
      isLoading: contacts === null,
      addContact,
      updateContact, // <------------------- Dont forget to export
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
