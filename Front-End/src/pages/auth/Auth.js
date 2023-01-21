import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import UserSignup from "./signup/UserSignup"

import classes from "./Auth.module.css"


const Auth = () => {

  return(
    <div className={classes.AuthBox}>
      <div className={classes.AuthTitle}>
        <h1>Style With Us</h1>
      </div>
      <div className={classes.AuthBody}>
        <Routes>
          <Route path="login" element={<Login/>}></Route>
          <Route path="usersignup" element={<UserSignup/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Auth
