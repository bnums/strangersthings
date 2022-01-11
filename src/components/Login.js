import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api";



const Login = ({
  username,
  setUsername,
  setToken
}) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data, error, success } = await login(username, password);
      if (!success) {
        setMessage(error.message)
      } else {
        setMessage(`Welcome ${username}, thank you for logging in!`)
        setToken(data.token)
      }
    }catch(error){
      throw(error);
    }
    finally{
      setStatus(true);
    }
  }


  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} />
        <input value={password} placeholder="password" onChange={(event) => { setPassword(event.target.value) }} />
        <button>submit</button>
      </form>
      {status ? <h3>{message}</h3> : ""}
      <br />
      <button><Link to="/register-page">Don't have an account? Click here to register for one!</Link></button>
    </div>
  )
}

export default Login;