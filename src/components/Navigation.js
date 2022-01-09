import { Link } from "react-router-dom";

const Navigation = () =>{

  return(
    <nav className="nav-bar">
      <Link to='/'>Home{" "}</Link> |
      <Link to='/login-page'>Login</Link> |
      {/* <Link to='/make-post'>Make a Post</Link> */}
    </nav>

  )
}


export default Navigation;