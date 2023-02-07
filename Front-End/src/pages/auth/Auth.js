import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import UserSignup from "./signup/UserSignup"
import ConsultantSignup from "./signup/ConsultantSignUp"

import classes from "./Auth.module.css"
import FindPassword from "./password/FindPassword"
import SetNewPassword from "./password/SetNewPassword"
import PasswordChange from "./password/PasswordChange"
import Signup from "./signup/Signup"
import AdminLogin from "../admin/AdminLogin"
import ManageConsultant from "../admin/ManageConsultant"


const Auth = () => {

  return(
    <div className={classes.AuthBox}>
      <div className={classes.AuthTitle}>
        {/* <p>Style With Us</p> */}
      </div>
      <div className={classes.AuthBody}>
        <Routes>
          <Route path="login" element={<Login/>}></Route>
          <Route path="usersignup" element={<UserSignup/>}></Route>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="consultantsignup" element={<ConsultantSignup/>}></Route>
          <Route path="findpassword" element={<FindPassword/>}></Route>
          <Route path="setnewpassword" element={<SetNewPassword/>}></Route>
          <Route path="passwordchange" element={<PasswordChange/>}></Route>
          <Route path="adminlogin" element={<AdminLogin/>}></Route>
          
        </Routes>
      </div>
    </div>
  )
}

export default Auth
