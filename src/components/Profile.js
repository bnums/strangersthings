import React from 'react';
import { Link } from 'react-router-dom';



const Profile = ({ user }) => {

  return (
    <div className='user-profile'>
      {user ? <h3>Welcome to {user}'s Profile</h3> : <Link to='/account/login'>Please login first</Link>}
    </div>
  )

}

export default Profile;