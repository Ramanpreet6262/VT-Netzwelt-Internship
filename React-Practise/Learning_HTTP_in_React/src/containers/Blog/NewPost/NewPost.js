import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
    submitted: false
  };

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    axios.post('/posts', data).then(res => {
      console.log(res);
      this.setState({ submitted: true }); // This will replaces current page with this page on the stack and if we click back button we can't go back to new-post page...
      // Another way to change page by history prop
      // this.props.history.push('/posts'); // This will push this page onto stack and if we click back button we can go to new-post page...
      // this.props.history.replace('/posts'); // This will do same behaviour as Redirect by replacing current page on stack...
    });
    // Point to note is axios automatically does json.stringify() under the hood for us...
  };

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to='/posts' />;
    }
    return (
      <div className='NewPost'>
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type='text'
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows='4'
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value='Max'>Max</option>
          <option value='Manu'>Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
