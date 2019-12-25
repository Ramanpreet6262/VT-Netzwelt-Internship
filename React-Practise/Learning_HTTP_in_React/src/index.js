import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// To set a Default Global Configuration eg: A common URL to which we can add a different route at end
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors are functions to set somethings globally and use method to register a new interceptor
axios.interceptors.request.use(
  request => {
    console.log(request);
    // We can edit this request config before returning
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
    // Promise.reject() so we can forward it to Components...
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
