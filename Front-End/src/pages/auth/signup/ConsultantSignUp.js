import axios from "axios";
import { useState } from "react";
// 컴포넌트 호출
import InputLabel from "../component/InputLabel";
import {DataInput} from "../component/Effectiveness";


const ConsultantSignUp = () =>{
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [name, setName, nameError] = DataInput(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/);
  const [nickName, setNickName, nickNameError] = DataInput(/^[a-zA-z0-9]{3,20}$/);
  const [email, setEmail, emailError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);
  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [confirmPassword, setConfirmPassword, confirmPasswordError] = CheckPassword(password);
  const [gender, setGender] = useState("");
  const [resume, setResume, resumeError] = DataInput("")

  // 컨설턴트 회원가입 api 요청
  const consultantSignUpsubmit = (event) => {
    event.preventDefault();
    const url = "http://192.168.100.81/cosultant/register";
    axios.post(
      url,{
        consultantId: id,
        consultantName: name,
        consultantNickname: nickName,
        consultantEmail: email,
        consultantPw: password,
        consultantResume: resume,
        consultantType: 0,
        consultantGender: gender,
      }
    ).then(response =>{
      console.log(response);

    }).catch(error =>{
      console.log(error);
    });
  }

  // submit 활성화 & 비활성화
  const nullError = !!id && !!name && !!nickName && !!email && !!password && !!confirmPassword
  const effectivnessError = idError && nameError && nickNameError && emailError && passwordError && confirmPasswordError
  const submitError = nullError && effectivnessError

  return(
    <div>
      <form action={consultantSignUpsubmit}>
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
        <button type="submit" disabled={!submitError}>로그인</button>
      </form>
    </div>
  )
}

export default ConsultantSignUp