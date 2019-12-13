import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;
  //This allows React to automatically connect  this class based component to our context behind the scenes

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus(); // current gives us current ref.....
    console.log(this.context.authenticated);
  }

  render() {
    return (
      <Aux>
        {/* <AuthContext.Consumer>
          {context =>
            context.authenticated ? <p>Authenticated</p> : <p>Please login</p>
          }
        </AuthContext.Consumer> */}
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please login</p>
        )}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key='i2'>{this.props.children}</p>
        <input
          key='i3'
          // ref={inputEl => {
          //   this.inputElement = inputEl;
          // }} /* This is one approach to use refs */
          ref={this.inputElementRef}
          type='text'
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
