// ContactCard.jsx
import React from 'react';
//import css styles
import './styles.css';

// props are passed to a React component as the first argument of the function
const ContactCard = (props) => {
  const [isFavorite, setIsFavorite] = React.useState(false); // the state that tracks if the contact is a favorite

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // toggle the state
  }

  const handleRemove = () => {
    props.onRemove(props.email); // call the onRemove function passed as a prop with the email of the contact
  }

  // We create an object with the styles (kebab-case becomes camelCase)
  const styles = {
    border: '1px solid #eaeaea',
    backgroundColor: 'rgba(255 255 255 / 0.1)',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
  };

  // Styles for when a contact is a favorite
  const favoriteStyles = {
    backgroundColor: 'rgba(255, 222, 73, 0.15)',
    border: '1px solid #f0c711'
  };

  const cardStyles = isFavorite ? { ...styles, ...favoriteStyles } : styles; // we merge the styles based on the isFavorite state
  const personNameClasses = isFavorite ? 'person-name favorite' : 'person-name'; // we create a dynamic class name based on the isFavorite state

  return (
    // and we pass that dynamic property to the inline style attribute of the div
    <div style={cardStyles}>
      <img src={props.photo} alt={props.name} style={{ width: '100px', borderRadius: '50%' }} />

      <h3 className={personNameClasses}>{props.name}</h3> {/* We use the variable here */}
      {/* We use the class name here */}
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
      
      {/* create this wrapping div so we can align the button to the right */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}> {/* Change the alignment between the buttons */}
        <button onClick={handleRemove} className='secondary'>❌</button> {/* the remove button */}

        {/* link the onClick with the handleFavorite method */}
        <button onClick={handleFavorite}>{isFavorite ? 'Remove from' : 'Mark as'} favorite</button>  {/* We add a button */}
      </div>
    </div>
  );
};

export default ContactCard;
