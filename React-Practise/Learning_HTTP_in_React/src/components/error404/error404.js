import React from 'react';
import gif404 from '../../assets/images/404.gif';

const error404 = () => {
  return (
    <img
      src={gif404}
      alt='OOPS!! Page not found'
      style={{
        display: 'block',
        margin: 'auto',
        width: '80%'
      }}
    />
  );
};

export default error404;
