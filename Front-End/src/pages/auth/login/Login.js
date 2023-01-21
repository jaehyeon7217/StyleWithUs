import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { authActions } from '../../../store/auth';

import { IdInput, PasswordInput }  from "../component/Effectiveness";

import classes from "./Login.module.css"

import InputLabel from "../component/InputLabel";

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId, idError] = IdInput("");
  const [password, setPassword, passwordError] = PasswordInput("");
  const [isUser, setIsUser] = useState(true);

  // login
  const loginSubmit = (event) => {
    event.preventDefault();
    const url = isUser ? "http://192.168.100.82/user/login" : "http://192.168.100.82/consultant/login";
    
    axios.post(
      url, isUser ? {userId : id, userPw : password} : {consultantId : id, consultantPw : password} )
      .then(response => {
        console.log(response)
        isUser ? dispatch(authActions.userLogin(response.data.auth_token)) : dispatch(authActions.consultantLogin(response.data.auth_token));
      })
      .catch(error =>{
        window.alert(error)
      });
  };

  return(
    <div>
      <form onSubmit={loginSubmit}>
        <InputLabel 
          label="아이디"
          type="text" 
          value={id} 
          placeholder="아이디를 입력해주세요" 
          onChange={setId}
          errorMessage={(idError ? "" : "영어와 숫자로만 이루어져있어야합니다.")}
        />
        <InputLabel
          label="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={(passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요.")}
        />
        <button type="submit" >로그인</button>
      </form>
    
    </div>
  )
}

export default Login;
