import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInbox } from '.';

const Profile = ({ token, posts, deletePost, user, }) => {
  const navigate = useNavigate();
  return (
    <div className='user-profile'>
      {token ? <UserInbox posts={posts} token={token} deletePost={deletePost} user={user} /> : 
      <button onClick={() => { navigate('/account/login') }}>Please login first</button>}
    </div>
  )
}


export default Profile;