import classes from "./NavBar.module.css";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/');
  };

  return(
    <div className={classes.header}>
      <img src={logo} alt="img" onClick={onClickHandler}/>
      <div className={classes.box}>
        <NavTop/>
        <NavBottom/>
      </div>
    </div>
  )
}

export default NavBar