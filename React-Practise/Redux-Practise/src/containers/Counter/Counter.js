import React, { Component } from 'react';
import { connect } from 'react-redux';
//connect is a function, which returns a function and takes component as input
// And i.e. Connect is a function which returns a higher order component ....

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  // state = {
  //   counter: 0
  // };

  // counterChangedHandler = (action, value) => {
  //   switch (action) {
  //     case 'inc':
  //       this.setState(prevState => {
  //         return { counter: prevState.counter + 1 };
  //       });
  //       break;
  //     case 'dec':
  //       this.setState(prevState => {
  //         return { counter: prevState.counter - 1 };
  //       });
  //       break;
  //     case 'add':
  //       this.setState(prevState => {
  //         return { counter: prevState.counter + value };
  //       });
  //       break;
  //     case 'sub':
  //       this.setState(prevState => {
  //         return { counter: prevState.counter - value };
  //       });
  //       break;
  //   }
  // };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label='Increment'
          // clicked={() => this.counterChangedHandler('inc')}
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label='Decrement'
          // clicked={() => this.counterChangedHandler('dec')}
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label='Add 10'
          // clicked={() => this.counterChangedHandler('add', 5)}
          clicked={this.props.onAddCounter}
        />
        <CounterControl
          label='Subtract 8'
          // clicked={() => this.counterChangedHandler('sub', 5)}
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={this.props.onStoreResult}>Store Result</button>
        <ul>
          <li onClick={this.props.onDeleteResult}></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // this state is the state given to us by react-redux actually the state of redux...
  return {
    ctr: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
    onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
    onAddCounter: () => dispatch({ type: 'ADD', val: 10 }),
    onSubtractCounter: () => dispatch({ type: 'SUBTRACT', val: 8 }),
    onStoreResult: () => dispatch({ type: 'STORE_RESULT' }),
    onDeleteResult: () => dispatch({ type: 'DELETE_RESULT' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
