import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  // componentDidUpdate() { //because now we are not updating it rather it is getting added or removed to&from dom
  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.match.params.id)
      ) {
        axios.get('/posts/' + this.props.match.params.id).then(res => {
          this.setState({ loadedPost: res.data });
          //   console.log(res);
        });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id).then(res => {
      console.log(res);
    });
  };

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className='Edit'>
            <button className='Delete' onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;

/* 
By using this.setState in componentDidUpdate(),
We are ending up in an infinite loop of ajax requests

We are calling an ajax call in componentDidUpdate, and we set the state on the callback, 
that will trigger another call and update which will call the ajax request again and 
callback will set state again and so on.
*/
