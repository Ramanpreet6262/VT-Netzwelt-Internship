import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'abcfs', name: 'Raghav', age: 25 },
      { id: 'cjcds', name: 'Rakshit', age: 20 },
      { id: 'hbgdf', name: 'Raman', age: 21 }
    ],
    showPersons: false
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

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                key={person.id}
                change={event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
    }

    // let classes = ['red', 'bold'].join(' ');
    // By doing this we will get "red bold" at end i.e. a single string
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'bold']
    }

    return (
      <div className='App'>
        <h1>Hi, I am a React app</h1>
        <p className={classes.join(' ')}>This is working!!!</p>
        <button
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
// Radium works like this by wrapping our component as it is HOC
