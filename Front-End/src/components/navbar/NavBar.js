import classes from "./NavBar.module.css";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return(
    <div className={classes.header}>
      <img src={logo} alt="img"/>
      <div className={classes.box}>
        <NavTop/>
        <NavBottom/>
      </div>
    </div>
  )
}

export default NavBar