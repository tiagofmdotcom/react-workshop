// styles.jsx
import styled from 'styled-components';

// copy styles from ContactCard.jsx
export const StyledContactCard = styled.div`
  border: 1px solid #eaeaea;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;

  ${(props) => props.$isFavorite && `
    background-color: rgba(255, 222, 73, 0.15);
    border: 1px solid #f0c711
  `} // reuse the favoriteStyles here
`;

export const StyledContactName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #8e73ad;

  ${(props) => props.$isFavorite && `
    color: #f0c711;
  `}
`;

export const StyledAvatar = styled.img`
  width: 100px;
  ${(props) => props.$isRound && `
    border-radius: 50%;
  `}  
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

// variant to color
const colorVariants = {
  primary: '#017fc0',
  secondary: '#484f8d',
  danger: '#b32828',
};
export const StyledButton = styled.button`
  background-color:
    ${(props) => colorVariants[props.$variant] || colorVariants.primary};
  color: white;
`;