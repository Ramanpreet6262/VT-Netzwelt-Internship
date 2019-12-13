import React, { useEffect, useRef, useContext } from 'react';
// useContext is a React hook to use context api in functional component a better way otherwise we can use
//AuthContext.Consumer
/* as by AuthContext.Consumer context is only available between these tags and whereas useContext hook allows
us to get access to our context anywhere in the functional component */

import AuthContext from '../../context/auth-context';
import classes from './Cockpit.css';

const Cockpit = props => {
  // React.createRef() is not supported in Functional Components so we will use hook useRef....
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    toggleBtnRef.current.click();
  }, []);

  useEffect(() => {
    console.log('2nd useEffect');
  });

  // useEffect();

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* <AuthContext.Consumer>
        {context => <button onClick={context.login}>Log In</button>}
      </AuthContext.Consumer> */}
      <button onClick={authContext.login}>Log In</button>
    </div>
  );
};

export default React.memo(Cockpit);
