// ContactList.jsx
import ContactCard from './ContactCard';
import { useContacts } from './useContactData.jsx';

export default function ContactList() {
  const { contacts, handleRemove, refetchContacts } = useContacts();

  return (
    <div>
      {!contacts?.length && (
        <>
          <p>No contacts found (yet!)</p>
          <button onClick={refetchContacts}>Try again</button>
        </>
      )}

      {contacts?.map((contact) => (
        <ContactCard
          key={contact.id} // Unique key for React to track changes properly
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          photo={contact.photo}
          onRemove={() => handleRemove(contact.email)} // Pass down remove function
        />
      ))}
    </div>
  );
}
