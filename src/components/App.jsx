import React, { Component } from "react";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
      name: "",
    number: "",
    filter: "",
  };



  isNameAlreadyExists = (name) => {
    return this.state.contacts.some((contact) => contact.name === name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    if (this.isNameAlreadyExists(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContact] };
    });
  };

  handleFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter((contact) => {
     return contact.name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };
  deletePhone = phoneid => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter( contacts => contacts.id !== phoneid),
    }));
  };
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div>
        <h1>Phone Book</h1>
        <div>
      <h1>Phone Book</h1>
    <form onSubmit={this.handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
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
          onChange={this.handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
</div>
        <label>
          Find contacts by name
          <input onChange={this.handleFilter} type="text" />
        </label>

        <h2>Contacts</h2>
        <ul>
  {this.getVisibleContacts().map(({ id, name, number }) => {
    return (
      
    
      <li key={id}>
        <p>
          {name}: {number}
        </p>
        <button type="button" onClick={() => this.props.deletePhone(id)}>
          Delete
        </button>
      </li>
    );
  })}
</ul>
      </div>
    );
  }
}