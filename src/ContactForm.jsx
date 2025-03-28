// ContactForm.jsx
import { StyledFormContainer, StyledFormRow } from './styles';
import { useState } from 'react';
import { useContacts } from './useContactData.jsx';

export default function ContactForm({ onSubmit }) {
  const { addContact } = useContacts();
  const currId = crypto.getRandomValues(new Uint32Array(1)).at(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: `https://picsum.photos/seed/${currId}/100/100`,
    id: currId,
  });

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
