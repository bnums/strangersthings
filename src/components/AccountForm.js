import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { callApi } from "../api"


const AccountForm = ({ setUser, setToken, setMessages }) => {
  const params = useParams();
  let { method } = params;
  const title = method === 'login' ? 'Log In' : 'Register'
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataObj = await callApi({
        url: `/users/${method}`,
        method: 'POST',
        body: {
          user: {
            username,
            password
          }
        }
      });

      const token = dataObj.data.token;

      if (token) {
        const dataObj = await callApi({
          url: `/users/me`,
          method: 'GET',
          token
        });
        const user = dataObj.data.username;
        if (user) {
          setUsername('');
          setPassword('');
          setToken(token);
          setUser(user);
          navigate('/');
          setMessages(dataObj.messages);
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
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
        <button
          type="submit">
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
      {/* {message.length > 0 && <h3>{message}</h3>} */}
    </div>
  )
}

export default AccountForm;