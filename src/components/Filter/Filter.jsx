export const Filter = ({ name, onChange }) => {
  return (
    <div>
      <p>Find contact by name</p>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
    </div>
  );
};
