import React from 'react';
// import { withRouter } from 'react-router-dom';
// withRouter is a higher order component which we use by wraping our exported component
// It adds location and other history and match routes in components down in the component tree

import './Post.css';

const post = props => (
  <article className='Post' onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className='Info'>
      <div className='Author'>{props.author}</div>
    </div>
  </article>
);

// export default withRouter(post);
export default post;
