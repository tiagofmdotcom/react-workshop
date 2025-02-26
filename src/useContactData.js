// useContactData.js
import { useState, useEffect, useMemo } from 'react';

export default function useContactData() {
  const [contacts, setContacts] = useState(null);
  const [refetchContacts, setRefetchContacts] = useState(false);

  useEffect(() => {
    if(!refetchContacts) return;

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
      return { photo: `https://randomuser.me/api/portraits/${gender}/${contact.id}.jpg`, ...contact }; // reverse the order so we dont overwrite
    });
  }, [contacts]);

  const handleRemove = (email) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  };

  // Add a function to add a contact
  const addContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  }

  return {
    contacts: contactsWithPhotos,
    handleRemove,
    refetchContacts: () => setRefetchContacts(true),
    isLoading: contacts === null, // Add loading state
    addContact, // return the function to add a contact
  };
}