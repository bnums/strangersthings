import './App.css';
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react';


// React components
import {
  Posts,
  Login,
  Register,
  Navigation,
  MakePost,
  AccountForm
  // Profile
} from './components';


function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const handleLogout = () => {
    console.log("loggin out")
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token')) //when user logged in set localstorage token so user will be logged in
    }
  }, [])


  return (
    <div className="App">
      <Navigation token={token} />
      {token && <h2> Welcome {user}! </h2>}
      <Routes>
        <Route exact path='/' element={<Posts posts={posts} setPosts={setPosts} token={token} />} />
        {/* <Route path='/login-page' element={<Login username={user} setUsername={setUser} token={token} setToken={setToken} />} />
        <Route path='/register-page' element={<Register />} /> */}
        <Route exact path='/make-post' element={<MakePost token={token} />} />
        <Route exact path='/account/:method' element={<AccountForm setUser={setUser} setToken={setToken}/>}/>
      </Routes>
    </div>
  );
}


export default App;
