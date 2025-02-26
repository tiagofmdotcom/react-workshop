// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';

function App() {
  
  return (
    <main className='container'>
      <StyledRow>
        <h1>Contacts Manager</h1>
        <StyledButton $variant="success">Add contact</StyledButton>
      </StyledRow>
      
      <ContactList />
    </main>
  );
}

export default App;
