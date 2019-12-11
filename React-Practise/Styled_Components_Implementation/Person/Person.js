import React from 'react';
// import './Person.css';
// This importing of css files in js files becomes possible by webpack (build tool)
// Actually it doesn't import css here rather it injects this css file links in index.html file....
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: '450px';
  }
`;

const person = props => {
  return (
    // <div className='Person' style={style}>
    <StyledDiv>
      <p onClick={props.click}>
        I am {props.name} and I am {props.age} years old
      </p>
      <p>{props.children}</p>
      <input type='text' onChange={props.change} value={props.name} />
      {/* if we add value as attribute then onChange is necessary to change value */}
    </StyledDiv>
    // </div>
  );
};

export default person;
