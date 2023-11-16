import { nanoid } from 'nanoid';

export const ListContacts = ({ contacts, deleteContact }) => {
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        gap: '10px',
      }}
    >
      {contacts.map(({ id, name, number }) => (
        <li
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
          key={nanoid()}
        >
          {name} : {number}
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
