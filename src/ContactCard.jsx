// ContactCard.jsx
import React from 'react';
//import css styles
import './styles.css';

const ContactCard = () => {
  const name = 'Mr. Whiskerson';
  const email = 'whiskerson@contoso.org';
  const phone = '123-456-7890';

  // We create an object with the styles (kebab-case becomes camelCase)
  const styles = {
    border: '1px solid #eaeaea',
    backgroundColor: 'rgba(255 255 255 / 0.1)',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
  };

  return (
    // and we pass that dynamic property to the inline style attribute of the div
    <div style={styles}>
      <h3 className='person-name'>{name}</h3> {/* We use the class name here */}
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
};

export default ContactCard;
