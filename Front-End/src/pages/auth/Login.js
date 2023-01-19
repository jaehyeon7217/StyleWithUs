import { useSelector, useDispatch } from "react-redux";
import classes from "./Login.module.css"
import axios from "axios";
import { useState } from "react";
import { authActions } from '../../store/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("")
  const [passwordError, setPasswordError] = useState("")


  const loginSubmit = (event) => {
    event.preventDefault();
    const url = "http://192.168.100.82/user/login";
    
    axios.post(
      url, {userId : id, userPw : password})
      .then(response => {
        console.log("성공");
        console.log(response.data.auth_token);
        dispatch(authActions.login(response.data.auth_token));
      })
      .catch(error =>{
        console.log("실패!");
        console.log(error);
      });
  };

  const checkId = (event) =>{
    const regExp = /^[a-zA-z0-9]{5,20}$/;
    if (!regExp.test(event.target.value)){
      idError = ""
    }
    console.log("아이디 유효성 검사 ::", regExp.test(event.target.value));
  };
  // 특수문자 제외 영어 숫자로 20글자까지
  const checkPassword = (event) =>{
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    console.log('비밀번호 유효성 검사 :: ', regExp.test(event.target.value));
  };
  // 영문자, 숫자 특수문자 반드시 포함 9 ~16글자
  return(
    <div>
      <form onSubmit={loginSubmit}>
        <label htmlFor="id">
          <p>ID</p>
        <input 
          type="text"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={(e) => {setId(e.target.value); checkId(e);}}
        />
        </label>
        <br />
        <label htmlFor="password"> 
        <p>Password</p>
        <input 
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {setPassword(e.target.value); checkPassword(e);}}
        />
        </label>
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default Login;
