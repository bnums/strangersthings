import React from 'react';
import { Link } from 'react-router-dom';
import { PostSingle } from '.';

const Profile = ({ user, token, posts, setPosts, messages, deletePost }) => {

  const userPosts = posts.filter(element => element.isAuthor !== false);

  return (
    <div className='user-profile'>
      {user ? "" : <Link to='/account/login'>Please login first</Link>}
      <h3>Inbox</h3>
      {
        messages.length > 0 ? messages.map(message => {
          return (
            <div>{message}</div>
          )
        }) : <h5>No messages to display</h5>
      }
      <h3>Active Posts</h3>
      {
        userPosts && userPosts.length
          ? userPosts.map(post => {
            return (
              <PostSingle key={post._id} post={post}>
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </PostSingle>
            );
          })
          : <h5>No active posts to display</h5>
      }
    </div>
  )
}


export default Profile;