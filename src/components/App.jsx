import { nanoid } from 'nanoid';
import { FormContacts } from './Formcontacts/Formcontacts';
import { ListContacts } from './Listcontacts/Listcontacts';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, changeFilter, deleteContact } from 'redux/phonebook/reducer';

export const App = () => {
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);

  const dispatch = useDispatch();

  const handleAddContact = data => {
    const { name, number } = data;
    if (
      contacts.find(
        contact => contact.name === name && contact.number === number
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(
      addContact({
        id: nanoid(),
        name,
        number,
      })
    );
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    dispatch(changeFilter(inputFilter));
  };

  const btnDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
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
      <ListContacts contacts={filterContacts} deleteContact={btnDeleteContact} />
    </div>
  );
};
