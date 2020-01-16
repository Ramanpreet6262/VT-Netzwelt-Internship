const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  // if (action.type === 'INCREMENT') {
  //   return {
  //     counter: state.counter + 1
  //   };
  // }
  // if (action.type === 'DECREMENT') {
  //   return {
  //     counter: state.counter - 1
  //   };
  // }
  // if (action.type === 'ADD') {
  //   return {
  //     counter: state.counter + action.val
  //   };
  // }
  // if (action.type === 'SUBTRACT') {
  //   return {
  //     counter: state.counter - action.val
  //   };
  // }

  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      }; //This is not like setState here new state returned will contain only counter and not like setState containing results also
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      };
    case 'ADD':
      return {
        ...state,
        counter: state.counter + action.val
      };
    case 'SUBTRACT':
      return {
        ...state,
        counter: state.counter - action.val
      };
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({ id: new Date(), val: state.counter })
        // We used concat instead of push as it returns a new array so doing it immutablly...
      };
    case 'DELETE_RESULT':
      // We normally delete an item from array using splice() method eg: state.results.splice(id, 1)
      // But using this, it mutates original array. So to do it immutablly create a new array that can be done in 2 ways..
      // 1. const newArray = [...state.results]. It is right only for normal properties but if there is an object inside this object then this is not enough as it will still point to that object...
      // or 2. Use filter method... As it returns a new array...

      const updatedArray = state.results.filter(
        result => result.id !== action.resultElId
      );
      return {
        ...state,
        results: updatedArray
      };
  }

  return state;
};

export default reducer;
