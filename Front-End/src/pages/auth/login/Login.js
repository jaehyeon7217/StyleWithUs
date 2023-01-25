import axios from "axios";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { authActions } from '../../../store/auth';
// component 분리
import  DataInput from "../component/Effectiveness";
import InputLabel from "../component/InputLabel";
// css 클래스
import classes from "./Login.module.css"


const Login = () => {
  const dispatch = useDispatch();

  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
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
