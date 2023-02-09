import classes from "./NavBar.module.css";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isConsulting = useSelector((state) => state.auth.isConsulting)

  const nonAction = () =>{
    
  }

  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementsByClassName(`${classes.header}`)[0].style.position = "relative";
    } else {
      document.getElementsByClassName(`${classes.header}`)[0].style.position = "sticky";
    }
  }, [location])

   const onClickHandler = () => {
    navigate('/');
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
  };

  return(
    <div className={classes.header}>
      <img src={logo} alt="img" onClick={isConsulting ? nonAction : onClickHandler} />
      <div className={classes.box}>
        <NavTop/>
        <NavBottom/>
      </div>
    </div>
  )
}

export default NavBar