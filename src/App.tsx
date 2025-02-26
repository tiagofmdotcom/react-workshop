// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm.jsx';
import useContactData from './useContactData';

function App() {
  const [showForm, setShowForm] = useState(false);
  const contactDataHook = useContactData();

  useEffect(() => {
  if(!contactDataHook.contacts?.length){
    contactDataHook.refetchContacts();
  }
  }, [contactDataHook, contactDataHook.contacts]);

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
        <ContactForm contactDataHook={contactDataHook} onSubmit={() => setShowForm(false)}/> :
        <ContactList contactDataHook={contactDataHook}/>
      }
    </main>
  );
}

export default App;
