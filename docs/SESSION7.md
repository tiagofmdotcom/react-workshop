### **Session 7: Context API and Prop Drilling**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md) [#3](SESSION3.md) [#4](SESSION4.md) [#5](SESSION5.md) [#6](SESSION6.md)

Have **React Devtools** browser extension installed: [Chrome-based](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

#### Practice

Goal: Fix state sharing issues by using useContext

**Steps:**
- rename useContactData hook to accept jsx
- Adapt the hook to useContext
```jsx
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

  return (
    <ContactContext.Provider value={{
      contacts: contactsWithPhotos,
      handleRemove,
      refetchContacts: () => setRefetchContacts(true),
      isLoading: contacts === null,
      addContact
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
```
- adapt App.tsx to use the new updated hook
```jsx
// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm.jsx';
import { ContactProvider, useContacts } from './useContactData';

function ContactManager() {
  const [showForm, setShowForm] = useState(false);
  const { contacts, refetchContacts } = useContacts();

  useEffect(() => {
    if (!contacts?.length) {
      refetchContacts();
    }
  }, [contacts, refetchContacts]);

  return (
    <main className='container'>
      <StyledRow>
        <h1>Contacts Manager</h1>
        <StyledButton
          $variant="success"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Show Contacts' : 'Add Contact'}
        </StyledButton>
      </StyledRow>
      
      {showForm ? 
        <ContactForm onSubmit={() => setShowForm(false)} /> :
        <ContactList />
      }
    </main>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <ContactManager />
    </ContactProvider>
  );
}
```

---

# Final result:

