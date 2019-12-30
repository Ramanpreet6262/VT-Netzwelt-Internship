import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import Error404 from '../../components/error404/error404';

class Blog extends Component {
  state = {
    auth: false
  };

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
                <NavLink to='/posts/' exact>
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
          {this.state.auth ? (
            <Route path='/new-post' component={NewPost} />
          ) : null}
          <Route path='/posts' component={Posts} />
          {/* This redirect will catch all other routes as it is from='/' so one way is this and other is to make a master route i.e. by 
          not defining path property due to which it will catch all non recognised routes here */}
          {/* <Redirect from='/' to='/posts' /> */}
          <Route component={Error404} />
          {/* <Route path='/' component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
