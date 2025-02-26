### **Session 5: Forms & Controlled Components**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md) [#3](SESSION3.md) [#4](SESSION4.md) [#5](SESSION5.md)
Have **React Devtools** browser extension installed: [Chrome-based](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

#### Practice

**Steps:**
- Start by adding a new button to `App.tsx`:
```jsx
// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';

function App() {
  
  return (
    <main className='container'>
      <StyledRow>
        <h1>Contacts Manager</h1>
        <StyledButton $variant="success">Add contact</StyledButton>
      </StyledRow>
      
      <ContactList />
    </main>
  );
}

export default App;
```
- and then extend our styles to include the **StyledRow** and the new button variant color:
```jsx
// styles.jsx
// variant to color
const colorVariants = {
  primary: '#017fc0',
  secondary: '#484f8d',
  danger: '#b32828',
  success: '#3e8914',
};
export const StyledButton = styled.button`
  background-color:
    ${(props) => colorVariants[props.$variant] || colorVariants.primary};
  color: white;
`;

export const StyledRow = styled.div`
margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
```

- Now we create a new component for the form editor `ContactForm.jsx`:
```jsx
// ContactForm.jsx
export default function ContactForm() {
    return (
        <div>
            <h1>Contact Form</h1>
        </div>
    )
}
```

- Now we need to being able to call the form when clicking in the **Add contact** button, so we change `App.tsx`:
```jsx
// App.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ContactList from './ContactList.jsx';
import { StyledButton, StyledRow } from './styles';
import { useState } from 'react';
import ContactForm from './ContactForm.jsx';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className='container'>
      <StyledRow>
        <h1>Contacts Manager</h1>
        <StyledButton
          $variant="success"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Show Contacts' : 'Add Contact'}
        </StyledButton>
      </StyledRow>
      
      {showForm ? 
        <ContactForm /> :
        <ContactList />
      }
    </main>
  );
}

export default App;
```

- Now we can start by creating the actual form: 
```jsx
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
```
- and the styles:
```jsx
export const StyledFormContainer = styled(StyledContactCard).attrs({ as : 'form' })`
  padding: 20px;
`;

export const StyledFormRow = styled.div`
  margin-bottom: 5px;
`;
```


---

# Final result:

![alt text](SESSION6-RESULT.png)