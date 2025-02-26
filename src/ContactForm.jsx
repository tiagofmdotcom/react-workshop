// ContactForm.jsx

import { StyledFormContainer, StyledFormRow } from './styles';
import { useState } from 'react';

export default function ContactForm() {
  const currId = crypto.getRandomValues(new Uint32Array(1)).at(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: `https://picsum.photos/seed/${currId}/200/300`,
    id: currId,
  });

  return (
    <StyledFormContainer>
      <StyledFormRow>ID: {formData.id}</StyledFormRow>
      <StyledFormRow>Name: {formData.name}</StyledFormRow>
      <StyledFormRow>Email: {formData.email}</StyledFormRow>
      <StyledFormRow>Phone: {formData.phone}</StyledFormRow>
    </StyledFormContainer>
  );
}
