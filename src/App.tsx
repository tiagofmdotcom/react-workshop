// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useState } from 'react';
import ContactForm from './ContactForm.jsx';

function App() {
  const [showForm, setShowForm] = useState(false);

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
        <ContactForm /> :
        <ContactList />
      }
    </main>
  );
}

export default App;
