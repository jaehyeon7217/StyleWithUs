import axios from "axios";
import { useState } from "react";
import InputLabel from "./component/InputLabel";

const PasswordChange = () => {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const [passwordError, setPasswordError] = useState("")
  const [newPasswordError, setNewPasswordError] = useState("")
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("")

  // 비밀번호 유효성 검사
  const checkPassword = (event) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    if (event.target.value === "") {
      setPasswordError("")
    }
    else if (!regExp.test(event.target.value)) {
      setPasswordError("영문, 숫자, 특수문자를 조합하여 입력해 주세요. (9-16자)")
    }
    else {
      setPasswordError("")
    };
  }
  // 새로운 비밀번호 유효성 검사
  const checkNewPassword = (event) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;

    if (event.target.value === "") {
      setNewPasswordError("")
    }
    else if (!regExp.test(event.target.value)) {
      setNewPasswordError("영문, 숫자, 특수문자를 조합하여 입력해 주세요. (9-16자)")
    }
    else {
      setNewPasswordError("")
    };
  }
  // 비밀번호와 일치하는지 검사 
  const checkConfirmNewPassword = (event) => {
    if (event.target.value === "") {
      setConfirmNewPasswordError("")
    }
    else if (event.target.value!==newPassword) {
      setConfirmNewPasswordError("새 비밀번호와 일치하지 않습니다.")
    }
    else {
      setConfirmNewPasswordError("")
    };
  }
  
  return(
    <div>
      <form>
        <InputLabel
          label="기존 비밀번호"
          type="password"
          value={password} 
          placeholder="비밀번호를 입력해주세요"
          onChange={(event) => { setPassword(event.target.value); checkPassword(event) }}
          errorMessage={passwordError}
        />
        <InputLabel
          label="새로운 비밀번호"
          type="Password"
          value={newPassword} 
          placeholder="새로운 비밀번호를 입력해주세요"
          onChange={(event) => { setNewPassword(event.target.value); checkNewPassword(event) }}
          errorMessage={newPasswordError}
        />
        <InputLabel
          label="새로운 비밀번호 확인" 
          type="password"
          value={confirmNewPasswordError}
          placeholder="새 비밀번호를 다시 입력해주세요"
          onChange={(event) => { setConfirmNewPassword(event.target.value); checkConfirmNewPassword(event) }}
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  )
}

export default PasswordChange;