import classes from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";

const NavBar = () => {
  return(
    <div className={classes.header}>
      <img className="logo" src={logo} alt="img" />
      <NavTop/>
      <NavBottom/>
    </div>
  )
}

export default NavBar