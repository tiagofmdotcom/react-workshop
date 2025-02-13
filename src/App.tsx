// App.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useEffect, useState} from 'react';
import ContactCard from './ContactCard.jsx'; // <---- Importing the component we created previous

function App() {
  {/* we define the setter function */}
  const [contacts, setContacts] = useState(null);

  // Use useEffect to load the data on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
      setContacts(data);
    };

    fetchContacts();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <main className='container'>
      <h1>Contacts Manager</h1>

      {contacts?.map((contact, index) => (  // Nullish coalescing operator to prevent errors when contacts is null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
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
