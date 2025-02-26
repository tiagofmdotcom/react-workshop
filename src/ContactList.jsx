// ContactList.jsx
import ContactCard from './ContactCard';

export default function ContactList(props) {
  const { contacts, handleRemove, refetchContacts } = props.contactDataHook;

 return (
   <div>    
      {(!contacts?.length) && (
        <>
          <p>No contacts found (yet!)</p>
          <button onClick={() => refetchContacts()}>Try again</button>
        </>
      )}

     {contacts?.map((contact) => (  // Nullish coalescing operator to prevent errors when contacts is null: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
       <ContactCard
         key={contact.id} /* don't forget the key, so react properly keeps track of mutation that require rerender */
         name={contact.name}
         email={contact.email}
         phone={contact.phone}
         photo={contact.photo} // we need to consume this new prop in the ContactCar.jsx to display the photo
         onRemove={handleRemove} // we need to consume this new prop in the ContactCar.jsx to remove the contact
       />
     ))}
   </div>
 );
}