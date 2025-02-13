// App.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useEffect, useMemo, useState} from 'react';
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

  const contactsWithPhotos = useMemo(() => { // Use useMemo to memoize the contacts with photos, so it doesn't recalculate on every render
    if (!contacts) return null;

    return contacts.map((contact) => {
      const gender = contact.id % 2 === 0 ? 'men' : 'women';
      return {...contact, photo: `https://randomuser.me/api/portraits/${gender}/${contact.id}.jpg`};
    }
    );
  }, [contacts]); // Recalculate only when contacts change

  
  return (
    <main className='container'>
      <h1>Contacts Manager</h1>
      
      {// Let's validate if there are contacts to display
       (!contacts?.length || !contactsWithPhotos?.length) && <p>No contacts found (yet!)</p>
      }

      {contactsWithPhotos?.map((contact, index) => (  // Nullish coalescing operator to prevent errors when contacts is null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
        <ContactCard
          key={index} /* don't forget the key, so react properly keeps track of mutation that require rerender */
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          photo={contact.photo} // we need to consume this new prop in the ContactCar.jsx to display the photo
        />
      ))}
    </main>
  );
}

export default App;
