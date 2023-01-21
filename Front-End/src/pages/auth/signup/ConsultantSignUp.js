import axios from "axios";
import { useState } from "react";
import { IdInput, NameInput, NinkNameInput, EmailInput, PasswordInput } from "../component/Effectiveness";

import InputLabel from "../component/InputLabel";

const ConsultantSignUp = () =>{
  const [id, setId, idError] = IdInput("");
  const [name, setName, nameError] = NameInput("");
  const [nickName, setNickName, nickNameError] = NinkNameInput("");
  const [email, setEmail, emailError] = EmailInput("");
  const [password, setPassword, passwordError] = PasswordInput("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  return(
    <div>

    </div>
  )
}

export default ConsultantSignUp