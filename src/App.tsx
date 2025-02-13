// App.tsx
import {useState} from 'react';
//@ts-expect-error we know that we are using jsx
import ContactCard from './ContactCard.jsx'; // <---- Importing the component we created previous

function App() {
  const [contacts] = useState([
    {
      name: 'John Cena',
      email: 'jcena@wwe.com',
      phone: '800-NO-SEE-ME',
    },
    {
      name: 'Chuck Norries',
      email: 'outlook@com.chucknorries',
      phone: '555-TX-RANGER',
    },
    {
      name: 'András István Arató',
      email: 'harold@gmail.com',
      phone: '800-HIDE-PAIN',
    },
  ]);

  return (
    <main className='container'>
      <h1>Contacts Manager</h1>

      {contacts.map((contact, index) => (
        <ContactCard
          key={index} /* don't forget the key, so react properly keeps track of mutation that require rerender */
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
        />
      ))}
    </main>
  );
}

export default App;