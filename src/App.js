import './App.css';
import {Routes, Route} from "react-router-dom"
import { useEffect, useState } from 'react';


// React components
import { 
  Posts, 
  Login,
  Register,
  Navigation
  // Profile

} from './components';


function App() {
  const [posts,setPosts] = useState([]);
  const [token, setToken] = useState('');
  const [username,setUsername] = useState('');


useEffect(() =>{
console.log(token)
},[token])


  return(
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Posts posts={posts} setPosts={setPosts}/>}/>
        <Route path='/login-page' element={<Login username={username} setUsername={setUsername} token={token} setToken={setToken}/>}/>
        <Route path='/register-page' element={<Register />}/>
      </Routes>
    </div>
  );
}


export default App;
