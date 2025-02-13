### **Session 4: Lifecycle vs Hooks, Lists, Keys, and Conditional Rendering**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md) [#3](SESSION3.md)
Have **React Devtools** browser extension installed: [Chrome-based](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

#### Practice

**Steps:**

- Map the contact info into an object array, using useState hook:
```jsx
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
```

- Lets use `.map()` to render the list more efficiently:
```jsx
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
```

- Now, instead of hardcoded values, let's get them from an api:
```jsx
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
```

- Lets fetch add some photos to the contacts:
```jsx
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

```

- We need to modify `ContactCard.jsx` to show the photo:
```jsx
// ContactCard.jsx
    <div style={cardStyles}>
      <img src={props.photo} alt={props.name} style={{ width: '100px', borderRadius: '50%' }} />
```

- Lets add some conditional rendering if we don't get any contacts data in our `App.tsx`:
```jsx
//App.tsx
      
      {// Let's validate if there are contacts to display
       (!contacts?.length || !contactsWithPhotos?.length) && <p>No contacts found (yet!)</p>
      }
```

- Lets add a button to remove, on the `ContactCard.jsx`:
```jsx
// ContactCard.jsx

  const handleRemove = () => {
    props.onRemove(props.id); // call the onRemove function passed as a prop with the id of the contact
  }

 // ...
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}> {/* Change the alignment between the buttons */}
        <button onClick={handleRemove} className='secondary'>❌</button> {/* the remove button */}

        {/* link the onClick with the handleFavorite method */}
        <button onClick={handleFavorite}>{isFavorite ? 'Remove from' : 'Mark as'} favorite</button>  {/* We add a button */}
      </div>
```

- But before it works, we need to handle the called event `onRemove` on the parent (`App.tsx`):
```
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

  // Define the function to remove a contact
  const handleRemove = (email) => {
    // we'll use the email as the unique identifier for the contact
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  }	

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
          onRemove={handleRemove} // we need to consume this new prop in the ContactCar.jsx to remove the contact
        />
      ))}
    </main>
  );
}

export default App;
```

- Here's is setting a unique key so important, and a way to fix it:
```jsx
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

  // Define the function to remove a contact
  const handleRemove = (email) => {
    // we'll use the email as the unique identifier for the contact
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  }	

  return (
    <main className='container'>
      <h1>Contacts Manager</h1>
      
      {// Let's validate if there are contacts to display
       (!contacts?.length || !contactsWithPhotos?.length) && <p>No contacts found (yet!)</p>
      }

      {contactsWithPhotos?.map((contact) => (  // Nullish coalescing operator to prevent errors when contacts is null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
        <ContactCard
          key={contact.id} /* don't forget the key, so react properly keeps track of mutation that require rerender */
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          photo={contact.photo} // we need to consume this new prop in the ContactCar.jsx to display the photo
          onRemove={handleRemove} // we need to consume this new prop in the ContactCar.jsx to remove the contact
        />
      ))}
    </main>
  );
}

export default App;

```

- Lets add a refetch button, we change the `App.tsx` to:
```jsx
// App.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useEffect, useMemo, useState} from 'react';
import ContactCard from './ContactCard.jsx'; // <---- Importing the component we created previous

function App() {
  {/* we define the setter function */}
  const [contacts, setContacts] = useState(null);
  const [refetchContacts, setRefetchContacts] = useState(false);

  // Use useEffect to load the data on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
      setContacts(data);
      setRefetchContacts(false);
    };

    fetchContacts();
  }, [refetchContacts]); // Empty dependency array ensures this runs only once after the initial render

  const contactsWithPhotos = useMemo(() => { // Use useMemo to memoize the contacts with photos, so it doesn't recalculate on every render
    if (!contacts) return null;

    return contacts.map((contact) => {
      const gender = contact.id % 2 === 0 ? 'men' : 'women';
      return {...contact, photo: `https://randomuser.me/api/portraits/${gender}/${contact.id}.jpg`};
    }
    );
  }, [contacts]); // Recalculate only when contacts change

  // Define the function to remove a contact
  const handleRemove = (email) => {
    // we'll use the email as the unique identifier for the contact
    setContacts((prevContacts) => prevContacts.filter((c) => c.email !== email));
  }	

  return (
    <main className='container'>
      <h1>Contacts Manager</h1>
      
      {// Let's validate if there are contacts to display
       (!contacts?.length || !contactsWithPhotos?.length) && (<>
        <p>No contacts found (yet!)</p>
        <button onClick={() => setRefetchContacts(true)}>Try again</button>
       </>)
      }

      {contactsWithPhotos?.map((contact) => (  // Nullish coalescing operator to prevent errors when contacts is null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
        <ContactCard
          key={contact.id} /* don't forget the key, so react properly keeps track of mutation that require rerender */
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          photo={contact.photo} // we need to consume this new prop in the ContactCar.jsx to display the photo
          onRemove={handleRemove} // we need to consume this new prop in the ContactCar.jsx to remove the contact
        />
      ))}
    </main>
  );
}

export default App;
```

---

**Final result:**
![alt text](SESSION4-RESULT.png)