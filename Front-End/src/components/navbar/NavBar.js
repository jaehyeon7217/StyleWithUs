import classes from "./NavBar.module.css";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     document.querySelector(`.${classes.header}`).style.position = "relative";
  //   } else {
  //     document.querySelector(`.${classes.header}`).style.position = "sticky";
  //   }
  // }, [location])

  const onClickHandler = () => {
    navigate('/');
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
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