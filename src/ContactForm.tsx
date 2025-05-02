// ContactForm.tsx
import { StyledFormContainer, StyledFormRow } from './styles';
import { useState, useEffect } from 'react';
import { type Contact, useContacts } from './useContactData.jsx';
import { useParams, Link } from 'react-router';

interface ContactFormProps {
  onSubmit: () => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const { addContact, contacts, updateContact } = useContacts();
  const { id } = useParams<{ id: string }>();
  const isNewContact = !id;

  const [formData, setFormData] = useState<Contact>({} as Contact);

  useEffect(() => {
    if (!isNewContact) {
      const contact = contacts?.find((contact) => contact.id === parseInt(id));
      if (contact) {
        setFormData(contact);
      }
    } else {
      const newId = crypto.getRandomValues(new Uint32Array(1)).at(0)!;

      setFormData({
        name: '',
        email: '',
        phone: '',
        photo: `https://picsum.photos/seed/${newId}/100/100`,
        id: newId,
      });
    }
  }, [isNewContact, id, contacts]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isNewContact) {      
    addContact(formData);
    } else {
      updateContact(formData);
    }
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
