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
  Home,
  MessageForm,
  EditForm,
} from './components';


function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('guest');
  const [messages, setMessages] = useState([]);


  const fetchPosts = async () => {
    const { data: { posts } } = await callApi({ url: '/posts', token })
    if (posts) {
      setPosts(posts);
    }
  }

  const deletePost = async (id) => {
    try {
      await callApi({ url: `/posts/${id}`, method: 'DELETE', token })
      const newPosts = posts.filter(element => element._id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error(error)
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
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  return (
    <div className="App">
      <Navigation user={user}/>
      {token &&
        <>
          <h2> Welcome {user}! </h2>
          <button
            onClick={() => {
              setToken('');
              setUser('guest');
              setMessages('');
              localStorage.clear();
            }
            }>Log Out</button>
        </>
      }
      <Routes>
        <Route exact path='/account/:method' element={<AccountForm setUser={setUser} setToken={setToken} setMessages={setMessages} />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/posts' element={<Posts setPosts={setPosts} posts={posts} fetchPosts={fetchPosts} token={token} user={user} deletePost={deletePost} />} />
        <Route path='/profile/:user' element={<Profile token={token} posts={posts} setPosts={setPosts} messages={messages} setMessages={setMessages} deletePost={deletePost} user={user}/>} />
        <Route exact path='/posts/:postId/messages' element={<MessageForm token={token} setPosts={setPosts} fetchPosts={fetchPosts} posts={posts} />} />
        <Route path='/posts/:postId/edit' element={<EditForm posts={posts} setPosts={setPosts} token={token} fetchPosts={fetchPosts}/>} />
      </Routes>
    </div >
  );
}


export default App;
