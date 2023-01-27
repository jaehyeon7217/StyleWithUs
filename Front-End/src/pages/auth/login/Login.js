import axios from "axios";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { authActions } from '../../../store/auth';
import { useNavigate } from "react-router-dom";
// component 분리
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
// css 클래스
import classes from "./Login.module.css"


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [isUser, setIsUser] = useState(true);

  // 로그인 api 요청
  const loginSubmit = (event) => {
    event.preventDefault();
    const url = isUser ? "http://192.168.100.81/user/login" : "http://192.168.100.81/consultant/login";
    
    axios.post(
      url, isUser ? {userId : id, userPw : password} : {consultantId : id, consultantPw : password} )
      .then(response => {
        console.log(response)
        if (response.status === 200){
          isUser ? dispatch(authActions.userLogin(response.data.auth_token)) : dispatch(authActions.consultantLogin(response.data.auth_token));
          navigate("/")
        }
        else{
          window.alert("아이디와 비밀번호를 확인해주세요!")
        }
      })
      .catch(error =>{
        window.alert("서버와 연결이 끊겼습니다.")
      });
  };
  // toggleBtn
  const onChangeBtn = () =>{
    setIsUser((event) => !(event))
  }

  // 회원가입 페이지 이동
  const toUserSignup = (event) => {
    event.preventDefault();
    navigate("/auth/usersignup")
  }

  // 비밀번호 찾기 페이지 이동
  const FindPassword = (event) => {
    event.preventDefault();
    navigate("/auth/findpassword")
  }

  // sumbit 활성화 & 비활성화
  const nullError = (!!id && !!password) 
  const effectivnessError = idError && passwordError
  const submitError = nullError && effectivnessError

  return(
    <div>
      <button 
        className="toggleBtn"
        onClick={onChangeBtn}>
        {isUser ? "U" : "C"}
      </button>
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
        <button type="submit" disabled={!submitError}>로그인</button>
      </form>
      <br />
      <label onClick={toUserSignup}>회원가입</label>
      &nbsp;&nbsp;
      &nbsp;&nbsp;
      |
      &nbsp;&nbsp;
      &nbsp;&nbsp;

      <label onClick={FindPassword}>비밀번호 찾기</label>
    
    </div>
  )
}

export default Login;
