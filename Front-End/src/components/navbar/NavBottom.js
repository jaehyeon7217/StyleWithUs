import { Link } from "react-router-dom";

import classes from "./NavBottom.module.css";

const NavBottom = () =>{
  return(
    <div className={classes.bottom}>
      <Link to="/recommend">추천</Link> | 
      <Link to="/consultant">컨설턴트 상담</Link>
    </div>
  )
}

export default NavBottom