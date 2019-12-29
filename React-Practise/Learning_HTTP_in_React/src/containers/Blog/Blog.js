import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

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
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: '/new-post', // Absolute Path
                    // pathname: this.props.match.url + '/new-post', // Relative Path
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}
                >
                  New Post
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section> */}
        {/* <Route path='/' exact render={() => <h1>Home</h1>} />
        <Route path='/' render={() => <h1>Home2</h1>} /> */}
        <Route path='/' exact component={Posts} />
        <Route path='/new-post' component={NewPost} />
        <Route path='/full-post' exact component={FullPost} />
      </div>
    );
  }
}

export default Blog;
