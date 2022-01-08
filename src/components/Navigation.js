import { Link } from "react-router-dom";

const Navigation = ({loggedIn}) =>{

  return(
    <nav className="nav-bar">
      <Link to='/'>Home{" "}</Link>
      <Link to='/login-page'>Login</Link>
    </nav>

  )
}


export default Navigation;