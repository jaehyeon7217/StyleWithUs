import classes from "./NavTop.module.css"
import { Link } from "react-router-dom"

const NavTop = () =>{
  return(
    <div className={classes.top}>
      <Link to="/mypage">My Page</Link> |
      <Link to="/">SBTI</Link> |
      <Link to="/">Log Out</Link>
    </div>
  )
}

export default NavTop