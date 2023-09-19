import React, { Component } from "react";
import { nanoid } from "nanoid";
import  {PhoneBook} from './PhoneBook/PhoneBook'
export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
  
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

  render() {
    return (
      <div>
        <h1>Phone Book</h1>
      <PhoneBook upSubmit={ this.handleSubmit }/>
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