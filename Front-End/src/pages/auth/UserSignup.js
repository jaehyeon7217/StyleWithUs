import axios from "axios";
import { useState } from "react";

const UserSignup = () => { 
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [gender, setGender] = useState("")
  
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
    )
    .then(response =>{
      console.log(response)
            
    })
    .catch(error =>{
      console.log(error)
    })
  }
  // 아이디 유효성 검사
  // 영어 숫자만으로 이루어진 20글자 아래의 아이디
  const checkId = (event) => {
    const regExp = /^[a-zA-z0-9]{0,20}$/;
    console.log("아이디 유효성 검사 ::", regExp.test(event.target.value));
  }
  // 닉네임 유효성 검사
  // 영어 숫자만으로 이루어진 20글자 아래의 닉네임
  const checkNickName = (event) => {
    const regExp = /^[a-zA-z0-9]{0,20}$/;
    console.log("아이디 유효성 검사 ::", regExp.test(event.target.value));
  }
  // 이름 유효성 검사
  // 한글로 이루어진 문자열 20글자 아래
  const checkName = (event) => {
    const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,20}/;
  }
  // 이메일 유효성 검사
  const checkEmail = (event) =>{
    const regExp  = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  }
  // 비밀번호 유효성 검사
  // 영문자, 숫자 특수문자 반드시 포함 9 ~ 16글자
  const checkPassword = (event) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    console.log('비밀번호 유효성 검사 :: ', regExp.test(event.target.value));
  }
  // 비밀번호 검사 유효성 검사
  // 영문자, 숫자 특수문자 반드시 포함 9 ~ 16글자
  // 비밀번호와 일치하는지 검사
  const checkConfirmPassword = (event) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    console.log('비밀번호 유효성 검사 :: ', regExp.test(event.target.value));
  }
  
    
  return(
    <div>
      <form onSubmit={signupEvent}>
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
        <label htmlFor="name"> 
          <p>name</p>
          <input 
            type="text"
            value={name}
            placeholder="이름을 입력해주세요"
            onChange={(e) => {setName(e.target.value); checkName(e);}}
          />
        </label>
        <br />
        <label htmlFor="nickName"> 
          <p>nickname</p>
          <input 
            type="text"
            value={nickName}
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => {setNickName(e.target.value); checkNickName(e);}}
          />
        </label>
        <br />
        <label htmlFor="email"> 
          <p>email</p>
          <input 
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => {setEmail(e.target.value); checkEmail(e);}}
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
        <label htmlFor="confirmPassword"> 
          <p>Confirm Password</p>
          <input 
            type="password"
            value={confirmPassword}
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={(e) => {setConfirmPassword(e.target.value); checkConfirmPassword(e);}}
          />
        </label>
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
export default UserSignup;