import React from 'react';
import './Person.css';
// This importing of css files in js files becomes possible by webpack (build tool)
// Actually it doesn't import css here rather it injects this css file links in index.html file....
import Radium from 'radium';

const person = props => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  };

  return (
    <div className='Person' style={style}>
      <p onClick={props.click}>
        I am {props.name} and I am {props.age} years old
      </p>
      <p>{props.children}</p>
      <input type='text' onChange={props.change} value={props.name} />
      {/* if we add value as attribute then onChange is necessary to change value */}
    </div>
  );
};

export default Radium(person);
