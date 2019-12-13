import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import AuthContext from '../context/auth-context';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    persons: [
      { id: 'abcfs', name: 'Raghav', age: 25 },
      { id: 'cjcds', name: 'Rakshit', age: 20 },
      { id: 'hbgdf', name: 'Raman', age: 21 }
    ],
    showPersons: false,
    authenticated: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons;
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    /*const persons = this.state.persons; This approach is wrong as objects and arrays are refernced type.
    So, it is actually a pointer to original array or object
    To prevent this either use slice() method without argument or use spread operator as both will create 
    a copy of it... */
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({ showPersons: !show });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <div className={classes.App}>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
// Radium works like this by wrapping our component as it is HOC
