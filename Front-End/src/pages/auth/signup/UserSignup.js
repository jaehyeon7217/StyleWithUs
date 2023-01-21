import axios from "axios";
import { useState } from "react";
import { IdInput, PasswordInput, NameInput, NinkNameInput, EmailInput } from "../component/Effectiveness";

import InputLabel from "../component/InputLabel";

const UserSignup = () => { 
  const [id, setId, idError] = IdInput("");
  const [name, setName, nameError] = NameInput("");
  const [nickName, setNickName, nickNameError] = NinkNameInput("");
  const [email, setEmail, emailError] = EmailInput("");
  const [password, setPassword, passwordError] = PasswordInput("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // 회원가입
  const signupEvent = (event) =>{
    event.preventDefault();
    const url = "http://192.168.100.82/user/register"
    axios.post(
      url,{
        userId : id,
        userPw : password,
        userName : name,
        userNickname : nickName,
        userEmail : email,
        userGender : gender,
      }
    ).then(response =>{
      console.log(response);
    }).catch(error =>{
      console.log(error);
    });
  };
  // 비밀번호와 일치하는지 검사
  const checkConfirmPassword = (event) => {
    if (event.target.value === "") {
      setConfirmPasswordError("");
    }else if (event.target.value!==password) {
      setConfirmPasswordError("비밀번호와 일치하지 않습니다.");
    }else {
      setConfirmPasswordError("");
    };
  };
      
  return(
    <div>
      <form onSubmit={signupEvent}>
        <InputLabel
          label="ID"
          type="text"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={setId}
          errorMessage={(idError ? "" : "영어와 숫자로만 입력해주세요.")}
        />
        <InputLabel
          label="name"
          type="text"
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={setName}
          errorMessage={(nameError ? "" : "한글로만 입력해주세요")}
        />
        <InputLabel
          label="nickname"
          type="text"
          value={nickName}
          placeholder="닉네임을 입력해주세요"
          onChange={setNickName}
          errorMessage={(nickNameError ? "" : "영어와 숫자로만 입력해주세요.")}
        />
        <InputLabel
          label="email"
          type="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={setEmail}
          errorMessage={(emailError ? "" : "이메일 양식을 지켜주세요.")}
        />
        <InputLabel
          label="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={(passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요.")}
        />
        <InputLabel
          label="confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={(e) => {setConfirmPassword(e.target.value); checkConfirmPassword(e);}}
          errorMessage={confirmPasswordError}        
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
export default UserSignup;