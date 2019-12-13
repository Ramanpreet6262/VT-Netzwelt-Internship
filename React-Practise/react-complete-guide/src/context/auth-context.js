import React from 'react';

const authContext = React.createContext({
  authenticated: false,
  login: () => {}
});

export default authContext;

// Context api solves the prop chaining problem i.e. we need a prop form A(parent) to D(child) and B and C
//are just passing it without doing anything so to prevent that we use context api
