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