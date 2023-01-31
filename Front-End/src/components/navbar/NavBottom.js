import { Link } from "react-router-dom";

import classes from "./NavBottom.module.css";

const NavBottom = () =>{
  return(
    <div className={classes.bottom}>
      <Link to="/recommend" className={classes.LinkBottom}>추천</Link> 
      <Link to="/consultant" className={classes.LinkBottom}>컨설턴트 상담</Link>
    </div>
  )
}

export default NavBottom