//@ts-expect-error we know that we are using jsx
import ContactCard from './ContactCard.jsx'; // <---- Importing the component we created previous

function App() {
  return (
    <main className='container'>
      <h1>Contacts Manager</h1>
      <ContactCard /> {/* <---- Now e can use the component */}
      {/* Also, Hi👋 I'm a JSX comment! */}
    </main>
  );
}

export default App;
