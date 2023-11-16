import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { FormContacts } from './Formcontacts/Formcontacts';
import { ListContacts } from './Listcontacts/Listcontacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('key')) ?? []
  );

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('key', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = data => {
    const { name } = data;

    if (
      contacts.find(
        contact => contact.name === name
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => 
      [...prevContacts, { ...data, id: nanoid() }],
    );
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    setFilter(inputFilter);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };


  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <h1>Phonebook</h1>
      <FormContacts handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} filter={filter} />
      <ListContacts
        contacts={filterContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};
