import { useState } from "react";
import { register } from "../api";


const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await register(username, password);
    if (!success) {
      setMessage("User already exists! Please login or use a different username instead.");
    } else {
      setMessage("You have successfully registered! Please login to start posting!")
    }
    setStatus(true)
  }


  return (
    <div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Register Here</h3>
        <input value={username} placeholder="username" onChange={(event) => { setUsername(event.target.value) }} />
        <input value={password} placeholder="password" onChange={(event) => { setPassword(event.target.value) }} />
        <button type="submit">Submit</button>
      </form>
      {status ? <h3>{message}</h3> : ""}
    </div>
  )
}

export default Register;