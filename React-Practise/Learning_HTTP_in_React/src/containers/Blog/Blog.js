import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                {/* <NavLink to='/' exact activeClassName='myactive' activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
                }}> */}
                {/* To override active class name */}
                <NavLink to='/' exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post', // Absolute Path
                    // pathname: this.props.match.url + '/new-post', // Relative Path
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path='/' exact render={() => <h1>Home</h1>} />
        <Route path='/' render={() => <h1>Home2</h1>} /> */}
        <Switch>
          <Route path='/' exact component={Posts} />
          <Route path='/new-post' exact component={NewPost} />
          <Route path='/:id' exact component={FullPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
