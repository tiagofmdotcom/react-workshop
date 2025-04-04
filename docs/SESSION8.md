### **Session 8: Routing in React**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md) [#3](SESSION3.md) [#4](SESSION4.md) [#5](SESSION5.md) [#6](SESSION6.md) [#7](SESSION7.md)

Have **React Devtools** browser extension installed: [Chrome-based](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

#### Practice

Goal: Create routes for the create/edit Contact form

**Steps:**

- Install add react-router dependency: `yarn react-router`

- On `App.tsx` add the Router Provider:
```jsx
// App.tsx
import { BrowserRouter } from 'react-router';

export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <ContactManager />
      </BrowserRouter>
    </ContactProvider>
  );
}
```

- Add default route:
```jsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router';

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
```

- Lets break down the list/form render logic, so it relies on routes instead of component state:
  - Move the shared layout to a reusable component that contains an outlet:
  ```jsx
    import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router';
    import React from 'react';

    export default function App() {
      return (
        <ContactProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<ContactIndexPage />} />
                <Route path="contact" element={<ContactFormPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContactProvider>
      );
    }
  ```

  - Create the shared layout component:
  ```jsx
  function MainLayout() {
    const location = useLocation();
    
    const isFormPage = React.useMemo(() => {
      return location.pathname === '/contact';
    }, [location.pathname]);

    return (
      <main className="container">
        <StyledRow>
          <h1>Contacts Manager</h1>
          <nav>
          {isFormPage ? (
              <Link to="/">
                <StyledButton $variant="secondary">View Contacts</StyledButton>
              </Link>
            ) : (
              <Link to="/contact">
                <StyledButton $variant="success">Add Contact</StyledButton>
              </Link>
            )}
          </nav>
        </StyledRow>
        <Outlet />
      </main>
    );
  }
  ```

  - And finally the list render and the form render into 2 components:
  ```jsx
  function ContactIndexPage() {
  const { contacts, refetchContacts } = useContacts();

  useEffect(() => {
      if (!contacts?.length) {
        refetchContacts();
      }
    }, [contacts, refetchContacts]);

    return <ContactList />;
  }

  function ContactFormPage() {
    const navigate = useNavigate();
    return <ContactForm onSubmit={() => navigate('/')} />;
  }
  ```

- Now we can easily reuse the form view to provide contact editing functionality:
  - First we define the route:
  ```jsx
    <Route path="contact/:id" element={<ContactFormPage />} />
  ```
  - And then adapt the ContactForm component:
  ```jsx
    // ContactForm.jsx
    import { StyledFormContainer, StyledFormRow } from './styles';
    import { useState, useEffect } from 'react';
    import { useContacts } from './useContactData.jsx';
    import { useParams, Link } from 'react-router';

    export default function ContactForm({ onSubmit }) {
      const { addContact, contacts } = useContacts();
      const params = useParams();
      const isNewContact = !params.id;

      const [formData, setFormData] = useState(null);

      useEffect(() => {
        if (!isNewContact) {
          const contact = contacts?.find((contact) => contact.id === parseInt(params.id));
          if (contact) {
            setFormData(contact);
          }
        } else {
          const newId = crypto.getRandomValues(new Uint32Array(1)).at(0);

          setFormData({
            name: '',
            email: '',
            phone: '',
            photo: `https://picsum.photos/seed/${newId}/100/100`,
            id: newId,
          });
        }
      }, [isNewContact, params.id, contacts]);
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        addContact(formData);
        onSubmit();
      };

      if (!formData) {
        return <div>
          <p>Something went wrong</p>
          <Link to="/">Go back</Link>
        </div>
      }

      return (
        <StyledFormContainer onSubmit={handleSubmit}>
          <StyledFormRow>ID: {formData.id}</StyledFormRow>

          <StyledFormRow>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange} // Use onChange instead of onInput for React best practices
            />
          </StyledFormRow>
          <StyledFormRow>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </StyledFormRow>
          <StyledFormRow>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </StyledFormRow>
          <StyledFormRow>
            Photo: <img width="100" src={formData.photo} alt={formData.name} />
          </StyledFormRow>
          <hr />
          <StyledFormRow>
            <button type="submit">Save</button>
          </StyledFormRow>
        </StyledFormContainer>
      );
    }
  ```
  - And finally we can add a link button to be able to edit each contact data
    - Lets pass the id prop to the ContactCard, for that change the ContactList:
    ```jsx
      {contacts?.map((contact) => (
        <ContactCard
          key={contact.id} // Unique key for React to track changes properly
          id={contact.id}
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          photo={contact.photo}
          onRemove={() => handleRemove(contact.email)} // Pass down remove function
        />
      ))}
    ```
    - And at last, add the link button on the ContactCard:
    ```jsx
      {/* Edit contact button */}
      <StyledButton $variant="secondary">
        <Link to={`/contact/${props.id}`}>Edit</Link>
      </StyledButton>
    ```

- Now we just need to handle contact update:
  - create a "updateContact" method on our contact hook:
  ```jsx
    // useContactData.js
    import { createContext, useContext, useState, useEffect, useMemo } from 'react';

    const ContactContext = createContext(null);

    export function ContactProvider({ children }) {
      // (...)

      const updateContact = (contact) => {
        setContacts((prevContacts) => prevContacts.map((c) => (c.id === contact.id ? contact : c)));
      };

      return (
        <ContactContext.Provider value={{
          contacts: contactsWithPhotos,
          handleRemove,
          refetchContacts: () => setRefetchContacts(true),
          isLoading: contacts === null,
          addContact,
          updateContact, // <------------------- Dont forget to export
        }}>
          {children}
        </ContactContext.Provider>
      );
    }

    export function useContacts() {
      return useContext(ContactContext);
    }
  
  ```
  - and on the Contact Form, we make use of it on the "onSubmit" method:
  ```jsx
    export default function ContactForm({ onSubmit }) {
    const { addContact, contacts, updateContact } = useContacts();
    
    // (...)

    const handleSubmit = (event) => {
      event.preventDefault();
      if(isNewContact) {      
      addContact(formData);
      } else {
        updateContact(formData);
      }
      onSubmit();
    };

  ```

- As of now, if we try to access directly access a contact, it wont load, because we only initially fetch then on the index route. To fix it, we just need to move the fetch logic up to our MainLayout component:
```jsx
// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useEffect } from 'react';
import ContactForm from './ContactForm.jsx';
import { ContactProvider, useContacts } from './useContactData';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router';
import React from 'react';

function MainLayout() {
  const location = useLocation();

  const { contacts, refetchContacts } = useContacts();

  useEffect(() => {
    if (!contacts?.length) {
      refetchContacts();
    }
  }, [contacts, refetchContacts]);
  
  const isFormPage = React.useMemo(() => {
    return location.pathname === '/contact';
  }, [location.pathname]);

  return (
    <main className="container">
      <StyledRow>
        <h1>Contacts Manager</h1>
        <nav>
        {isFormPage ? (
            <Link to="/">
              <StyledButton $variant="secondary">View Contacts</StyledButton>
            </Link>
          ) : (
            <Link to="/contact">
              <StyledButton $variant="success">Add Contact</StyledButton>
            </Link>
          )}
        </nav>
      </StyledRow>
      <Outlet />
    </main>
  );
}

function ContactIndexPage() {
  return <ContactList />;
}

function ContactFormPage() {
  const navigate = useNavigate();
  return <ContactForm onSubmit={() => navigate('/')} />;
}

export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ContactIndexPage />} />
            <Route path="contact" element={<ContactFormPage />} />
            <Route path="contact/:id" element={<ContactFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}
```

---

# Final result: