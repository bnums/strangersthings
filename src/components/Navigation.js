import { Link } from "react-router-dom";

const Navigation = () => {


  return (
    <nav className="nav-bar">
      <Link to='/'>Home{" "}</Link> |
      <Link to='/account/login'>{" "}Login/Register</Link>
    </nav>

  )
}


export default Navigation;