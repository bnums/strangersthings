import './App.css';
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react';
import { callApi } from './api';


// React components
import {
  Posts,
  Navigation,
  AccountForm,
  Profile,
  Home
} from './components';


function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');


  const fetchPosts = async () => {
    const { data: { posts } } = await callApi({ url: '/posts' , token})
    if (posts) {
      setPosts(posts);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token')) //when user logged in set localstorage token so user will be logged in
      setUser(localStorage.getItem('user'))
    }
  }, [])

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  return (
    <div className="App">
      <Navigation />
      {token &&
        <>
          <h2> Welcome {user}! </h2>
          <button
            onClick={() => {
              setToken('');
              setUser('');
              localStorage.clear();
            }
            }>Log Out</button>
        </>
      }
      <Routes>
        <Route exact path='/account/:method' element={<AccountForm setUser={setUser} setToken={setToken} />} />
        <Route exact path='/'element={<Posts setPosts={setPosts} posts={posts} fetchPosts={fetchPosts} token={token} user={user} />}/>
        <Route exact path='/profile' element={<Profile user={user} />}/>
      </Routes>
    </div >
  );
}


export default App;
