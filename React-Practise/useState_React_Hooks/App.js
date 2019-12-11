import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Raghav', age: 25 },
      { name: 'Rakshit', age: 20 },
      { name: 'Raman', age: 21 }
    ]
    // otherState: false
  });

  const [otherState, setOtherState] = useState(false);

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Rishabh', age: 20 },
        { name: 'Rakshit', age: 20 },
        { name: 'Raman', age: 21 }
      ],
      // otherState: personsState.otherState
    });
  };

  /* Very imp thing to note is that setPersonsState method here doesnot works like this.setState mathod of 
  react instead when we call it, only persons array is put in state and otherState is gone i.e. it replaces
  older state with it unlike setState method in which only persons array alters... */

  /* To prevent this either manually add otherState or use a different setState for it as in hooks we can use
  setStates as many times as we want */

  return (
    <div className='App'>
      <h1>Hi, I am a React app</h1>
      <p>This is working!!!</p>
      <button onClick={switchNameHandler}>Switch name</button>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
      >
        Hobbies: movies
      </Person>
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
      />
    </div>
  );
};

export default App;
