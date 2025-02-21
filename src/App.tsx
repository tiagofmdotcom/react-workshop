// App.tsx
// @ts-expect-error shoosh
import ContactList from './ContactList.jsx';

function App() {
  
  return (
    <main className='container'>
      <h1>Contacts Manager</h1>
      
      <ContactList />
    </main>
  );
}

export default App;
