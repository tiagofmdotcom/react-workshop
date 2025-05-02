// ContactCard.jsx
import React from 'react';
import { StyledAvatar, StyledButton, StyledContactCard, StyledContactName, StyledFooter } from './styles'; // import the styled component
import { Link } from 'react-router';

// props are passed to a React component as the first argument of the function
const ContactCard = (props) => {
  const [isFavorite, setIsFavorite] = React.useState(false); // the state that tracks if the contact is a favorite

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // toggle the state
  }

  const handleRemove = () => {
    props.onRemove(props.email); // call the onRemove function passed as a prop with the email of the contact
  }

  return (
    <StyledContactCard $isFavorite={isFavorite}> {/* We use the styled component here */}
      <StyledAvatar src={props.photo} alt={props.name} $isRound />

      <StyledContactName $isFavorite={isFavorite}>{props.name}</StyledContactName> {/* We use the variable here */}

      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
      
      {/* create this wrapping div so we can align the button to the right */}
      <StyledFooter>
        <StyledButton
          onClick={handleRemove}
          $variant="danger"
        >
          ⛌
        </StyledButton> {/* the remove button */}

        {/* Edit contact button */}
        <StyledButton $variant="secondary">
          <Link to={`/contact/${props.id}`}>Edit</Link>
        </StyledButton>

        {/* link the onClick with the handleFavorite method */}
        <StyledButton
          onClick={handleFavorite}
          $variant={isFavorite ? 'secondary' : 'primary'}
        >
          {isFavorite ? 'Remove from' : 'Mark as'} favorite
        </StyledButton>  {/* We add a button */}

      </StyledFooter>
    </StyledContactCard>
  );
};

export default ContactCard;
