import { Link } from "react-router-dom";

const Navigation = () => {


  return (
    <nav className="nav-bar">
      <Link to='/'> Home{" "}</Link> |
      {/* <Link to='/posts'>{" "} Posts</Link> | */}
      <Link to='/account/login'>{" "}Login</Link> |
      <Link to='/profile'> {" "}Profile </Link>

    </nav>

  )
}


export default Navigation;