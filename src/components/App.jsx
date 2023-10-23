import React, { useState } from "react";
import { nanoid } from "nanoid";

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const isNameAlreadyExists = (name) => {
    return contacts.some((contact) => contact.name === name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNameAlreadyExists(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setName(''); 
    setNumber(''); 
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deletePhone = (phoneid) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== phoneid));
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
      <label>
        Find contacts by name
        <input onChange={handleFilter} type="text" />
      </label>
      <h2>Contacts</h2>
      <ul>
        {getVisibleContacts().map(({ id, name, number }) => {
          return (
            <li key={id}>
              <p>
                {name}: {number}
              </p>
              <button type="button" onClick={() => deletePhone(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};