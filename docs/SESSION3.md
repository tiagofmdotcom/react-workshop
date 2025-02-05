### **Session 2: Components and JSX**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md)

**Steps:**

- Modify the `ContactCard.jsx` to get the contact data via props:

```jsx
// ContactCard.jsx
import React from 'react';
//import css styles
import './styles.css';

// props are passed to a React component as the first argument of the function
const ContactCard = (props) => {
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
      <h3 className='person-name'>{props.name}</h3>{' '}
      {/* We use the class name here */}
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
    </div>
  );
};

export default ContactCard;
```
