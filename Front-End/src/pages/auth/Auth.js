import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import UserSignup from "./signup/UserSignup"
import ConsultantSignup from "./signup/ConsultantSignUp"

import classes from "./Auth.module.css"
import FindPassword from "./password/FindPassword"
import SetNewPassword from "./password/SetNewPassword"


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
          <Route path="consultantsignup" element={<ConsultantSignup/>}></Route>
          <Route path="findpassword" element={<FindPassword/>}></Route>
          <Route path="setnewpassword" element={<SetNewPassword/>}></Route>

        </Routes>
      </div>
    </div>
  )
}

export default Auth
