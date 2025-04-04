// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm.jsx';
import { ContactProvider, useContacts } from './useContactData';
import { BrowserRouter, Routes, Route } from 'react-router';

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
      <BrowserRouter>
        <Routes>
          <Route index element={<ContactManager />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}
