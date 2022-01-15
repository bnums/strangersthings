import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { callApi } from '../api';
import { PostSingle } from '.';

const Profile = ({ user, token, posts, setPosts }) => {
  const [messages, setMessages] = useState([]);
  const userPost = posts.filter(element => element.isAuthor !== false);
 
  const getProfile = async () => {
    const { messages } = await callApi({
      url: '/users/me',
      method: 'GET',
      token
    })
    setMessages(messages);
  }

  const handleDelete = async (id) => {
    try {
      await callApi({ url: `/posts/${id}`, method:'DELETE', token })
      const newPosts = posts.filter(element => element._id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    try {
      getProfile();
    } catch (error) {
      console.error(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='user-profile'>
      {user ? "" : <Link to='/account/login'>Please login first</Link>}
      <h3>Inbox</h3>
      {
        messages ? messages.map(message => {
          return (
            <div>{message}</div>
          )
        }) : <div>No messages to display</div>
      }
      <h3>Active Posts</h3>
      {
        userPost && userPost.length 
          ? userPost.map(post => {
            return (
              <PostSingle key={post._id} post={post}>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </PostSingle>
            );
          })
          : <h5>No active posts to display</h5>
      }
    </div>
  )
}


export default Profile;