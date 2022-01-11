import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { login, register } from "../api"


const AccountForm = (setUser, setToken) => {
  const params = useParams();
  let { method } = params;
  const title = method === 'login' ? 'Log In' : 'Register'
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (method === 'login') {
        const { data, error, success } = await login(username, password);
        if (!success) {
          setMessage(error.message)
        } else {
          setMessage(`Welcome ${username}, thank you for logging in!`);
          setToken(data.token);
        }
      } else {
        const { success } = await register(username, password);
        if (!success) {
          setMessage("User already exists! Please login or use a different username instead.");
        } else {
          setMessage("You have successfully registered! Please login to start posting!")
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <h2>{title}</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <input
          required
          label="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          required
          label="Username"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button type="submit">
          {title}
        </button>
        <div>
          {
            method === 'login' ?
              <Link to={'/account/register'}> Don't have an account? Click here to sign up for one!</Link> :
              <Link to={'/account/login'}> Already have an account? Click here to log in!</Link>
          }
        </div>
      </form>
      {message.length > 0 && <h3>{message}</h3>}
    </div>
  )
}

export default AccountForm;