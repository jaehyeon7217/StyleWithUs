import axios from "axios";
import { redirect } from "react-router-dom";
import { useState } from "react";
// redux 호출
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../store/auth';
// component 불러오기
import InputLabel from "../component/InputLabel";
import { DataInput, CheckPassword } from "../component/Effectiveness";


const PasswordChange = () =>{
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.userData.id);

  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [newPassword, setNewPassword, newPasswordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [confirmNewPassword, setConfirmNewPassword, confirmNewPasswordError] = CheckPassword(newPassword);
  

  const PasswordChangeSubmit = (event) =>{
    event.preventDefault()
    const url = "http://192.168.100.82/user/password"
    axios.post(
      url,
      {
        userId : id,
        userPw : password,
        newUserPw : newPassword,
      }
    ).then(response => {
      dispatch(authActions.logout)
      return redirect("/login")

    }).catch(error => {
      window.alert("비밀번호를 다시 확인해주세요!")
    })
  };

  // sumbit 활성화 & 비활성화
  const nullError = !!password && !!newPassword && !!confirmNewPassword;
  const effectivnessError = passwordError && newPasswordError && confirmNewPasswordError;
  const submitError = nullError && effectivnessError;

  return(
    <div>
      <form action={PasswordChangeSubmit}>
        <InputLabel
          label="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={(passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요.")}
        />
        <InputLabel
          label="newPassword"
          type="password"
          value={newPassword}
          placeholder="비밀번호를 입력해주세요"
          onChange={setNewPassword}
          errorMessage={(newPasswordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요.")}
        />
        <InputLabel
          label="confirm Password"
          type="password"
          value={confirmNewPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={setConfirmNewPassword}
          errorMessage={(confirmNewPasswordError ? "" : "새로운 비밀번호와 다릅니다.")}        
        />
        <button type="submit" disabled={!submitError}>비밀번호 변경</button>
      </form>
    </div>
  )
};

export default PasswordChange;