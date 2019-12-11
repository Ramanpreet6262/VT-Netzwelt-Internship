import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Raghav', age: 25 },
      { name: 'Rakshit', age: 20 },
      { name: 'Raman', age: 21 }
    ]
  };

  switchNameHandler = () => {
    this.setState({
      persons: [
        { name: 'Rishabh', age: 20 },
        { name: 'Rakshit', age: 20 },
        { name: 'Raman', age: 21 }
      ]
    });
  };

  render() {
    return (
      <div className='App'>
        <h1>Hi, I am a React app</h1>
        <p>This is working!!!</p>
        <button onClick={this.switchNameHandler}>Switch name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          Hobbies: movies
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
