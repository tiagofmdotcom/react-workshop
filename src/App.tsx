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

      {/* we pass data via the attributes (aka, props) of our component */}
      <ContactCard
        name={contacts[0].name}
        email={contacts[0].email}
        phone={contacts[0].phone}
      />
      {/* we can create multiple instances of the component with different props*/}
      <ContactCard
        name={contacts[1].name}
        email={contacts[1].email}
        phone={contacts[1].phone}
      />
      {/* we binding the state array items */}
      <ContactCard
        name={contacts[2].name}
        email={contacts[2].email}
        phone={contacts[2].phone}
      />
      {/* <---- Now e can use the component */}
      {/* Also, Hi👋 I'm a JSX comment! */}
    </main>
  );
}

export default App;