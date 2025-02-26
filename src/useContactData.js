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
      return { ...contact, photo: `https://randomuser.me/api/portraits/${gender}/${contact.id}.jpg` };
    });
  }, [contacts]);

  const handleRemove = (email) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  };

  return {
    contacts: contactsWithPhotos,
    handleRemove,
    refetchContacts: () => setRefetchContacts(true),
    isLoading: contacts === null, // Add loading state
  };
}