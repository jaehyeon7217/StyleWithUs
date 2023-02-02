import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


import classes from "./NavBottom.module.css";

const NavBottom = () =>{

  const isLogined = useSelector((state)=> state.auth.isLogined)
  
  return(
    <div className={(isLogined ? classes.bottom : classes.bottomhidden)}>
      {/* <NavLink to="/recommend" className={classes.LinkBottom}>추천</NavLink>  */}
      <NavLink to="/recommend" className={(navData) => navData.isActive ? classes['LinkBottom-active'] : classes.LinkBottom}>추천</NavLink> 
      <NavLink to="/consultant" className={(navData) => navData.isActive ? classes['LinkBottom-active'] : classes.LinkBottom} >컨설턴트 상담</NavLink>
    </div>
  )
}

export default NavBottom