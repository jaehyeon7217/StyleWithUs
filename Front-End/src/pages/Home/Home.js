import LogoImage from "../../assets/logo.png"
import classes from "../Home/Home.module.css"


const Home = () =>{
  return(
    <div className={classes.HomePage}>
      <img src={LogoImage} alt="img" />
      <p>Welcome to Style With Us</p>
    </div>
  )
}

export default Home