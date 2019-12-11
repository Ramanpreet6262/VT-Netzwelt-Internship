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

  switchNameHandler = newName => {
    this.setState({
      persons: [
        { name: newName, age: 20 },
        { name: 'Rakshit', age: 20 },
        { name: 'Raman', age: 21 }
      ]
    });
  };

  nameChangedHandler = event => {
    this.setState({
      persons: [
        { name: 'jassi', age: 20 },
        { name: event.target.value, age: 20 },
        { name: 'Raman', age: 28 }
      ]
    });
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '2px solid blue',
      padding: '8px',
      color: 'black',
      cursor: 'pointer'
    };

    return (
      <div className='App'>
        <h1>Hi, I am a React app</h1>
        <p>This is working!!!</p>
        <button style={style} onClick={() => this.switchNameHandler('Rishabh')}>
          Switch name
        </button>
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'jassi')}
            change={this.nameChangedHandler}
          >
            Hobbies: movies
          </Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age}
          />
        </div>
      </div>
    );
  }
}

export default App;
