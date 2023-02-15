import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import UserSignup from "./signup/UserSignup"
import ConsultantSignup from "./signup/ConsultantSignUp"

import classes from "./Auth.module.css"
import FindPassword from "./password/FindPassword"
import SetNewPassword from "./password/SetNewPassword"
import Signup from "./signup/Signup"
import AdminLogin from "../admin/AdminLogin"
import NotFound from "../notfound/NotFound"

const Auth = () => {
  useEffect(() => {
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
  }, []);

  return(
    <div className={classes.AuthBox} id="AuthBox">
      <div className={classes.AuthBody} id="AuthBody">
        <Routes>
          <Route path="login" element={<Login/>}></Route>
          <Route path="usersignup" element={<UserSignup/>}></Route>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="consultantsignup" element={<ConsultantSignup/>}></Route>
          <Route path="findpassword" element={<FindPassword/>}></Route>
          <Route path="setnewpassword" element={<SetNewPassword/>}></Route>
          <Route path="adminlogin" element={<AdminLogin/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Auth
