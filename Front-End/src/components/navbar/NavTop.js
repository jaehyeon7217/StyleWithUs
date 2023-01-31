import classes from "./NavTop.module.css"
import { Link } from "react-router-dom"

const NavTop = () =>{
  return(
    <div className={classes.top}>
      <Link to="/mypage" className={classes.LinkTop}>마이페이지</Link> 
      <Link to="/" className={classes.LinkTop}>SBTI</Link> 
      <Link to="/"className={classes.LinkTop}>로그아웃</Link>
    </div>
  )
}

export default NavTop