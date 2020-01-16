/* This will not include any react code
It is basic implementation of redux using node */

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
  //Never ever mutate any data always do it immutablly................
  if (action.type === 'INC_COUNTER') {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 6 });
console.log(store.getState());
