### **Session 8: Routing in React**

**Pre-requirements:**
Have `node.js` v18+ and `yarn` installed:

- https://nodejs.org/en/download
- https://classic.yarnpkg.com/lang/en/docs/install/
- Check correct `yarn` installation by running `yarn --version`

Have completed previous sessions [#1](SESSION1.md) [#2](SESSION2.md) [#3](SESSION3.md) [#4](SESSION4.md) [#5](SESSION5.md) [#6](SESSION6.md) [#7](SESSION7.md)

Have **React Devtools** browser extension installed: [Chrome-based](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

#### Practice

Goal: Create routes for the create/edit Contact form

**Steps:**

- Install add react-router dependency: `yarn react-router`

- On `App.tsx` add the Router Provider:
```jsx
// App.tsx
import { BrowserRouter } from 'react-router';

export default function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <ContactManager />
      </BrowserRouter>
    </ContactProvider>
  );
}
```

---

# Final result: