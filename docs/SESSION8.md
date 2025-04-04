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



---

# Final result: