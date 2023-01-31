import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput, CheckPassword, UserValidCheck } from "../component/Effectiveness";
import { GenderCheckbox } from "../component/GenderCheckbox";
// classes 호출
import classes from "./UserSignUp.module.css"

const UserSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId, idEffectError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [name, setName, nameError] = DataInput(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/);
  const [nickName, setNickName, nickNameEffectError] = DataInput(/^[a-zA-z0-9]{3,20}$/);
  const [email, setEmail, emailEffectError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);
  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [confirmPassword, setConfirmPassword, confirmPasswordError] = CheckPassword(password);
  const [male, female, setMale, setFemale] = GenderCheckbox();
  const [inputCode, setInputCode] = useState("");
  const [emailOk, setEmailOk] = useState(false)
  
  const [idValidError, checkId] = UserValidCheck("id");
  const [emailValidError, checkEmail] = UserValidCheck("email");
  const [nickNameValidError, checkNickname] = UserValidCheck("nickname");

  // 유저 회원가입 api 요청
  const userSignupSubmit = (event) =>{
    event.preventDefault();
    const url = "http://43.201.72.251:8082/user/register"
    axios.post(
      url,{
        userId : id,
        userPw : password,
        userName : name,
        userNickname : nickName,
        userEmail : email,
        userGender : male ? 1 : 0,
      }
    ).then(response =>{
      if(response.status===200){
        navigate("/auth/login")
      }else{
        window.alert("입력항목을 다시 체크해주세요")
      }
    }).catch(error =>{
      console.log(error);
    });
  };

  const confirmEmail = (event) =>{
    event.preventDefault();
    const url = "http://43.201.72.251:8082/mail"
    axios.post(
      url,
      {
        email : email,
      }
    ).then(response=>{
      dispatch(authActions.validEmail(response.data.data))
    }).catch(error => {
      console.log(error);
    })
  }
  const emailCode = useSelector((state) => state.auth.confirmEmail)
  const checkEmailCode = (event) => {
    event.preventDefault();
    if (inputCode === emailCode){
      setEmailOk(true)
      window.alert("인증되었습니다!")
    }else{
      setEmailOk(false)
      window.alert("인증번호를 다시 한번 확인해 주세요")
    };
  };

  const toLogin = (event) => {
    event.preventDefault();
    navigate("/auth/login")

  }
  const idError = idEffectError && idValidError
  const nickNameError = nickNameEffectError && nickNameValidError
  const emailError = emailEffectError && emailValidError
 
  // sumbit 활성화 & 비활성화
  const nullError = !!id && !!name && !!nickName && !!email && !!password && !!confirmPassword
  const effectivnessError = idError && nameError && nickNameError && emailError && passwordError && confirmPasswordError
  const submitError = nullError && effectivnessError && emailOk

  return(
    <div>
      <h1 className={classes.PageName}>회원 가입</h1>
      <br />
      <form onSubmit={userSignupSubmit}>
        <InputLabel
          label="아이디"
          type="text"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={setId}
          onBlur={checkId}
          errorMessage={(idEffectError ? (idValidError ? "" : "이미 있는 아이디입니다.") : "영어와 숫자로만 입력해주세요.")}
        />
        <InputLabel
          label="이름"
          type="text"
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={setName}
          errorMessage={(nameError ? "" : "한글로만 입력해주세요")}
        />
        <InputLabel
          label="닉네임"
          type="text"
          value={nickName}
          placeholder="닉네임을 입력해주세요"
          onChange={setNickName}
          onBlur={checkNickname}
          errorMessage={(nickNameEffectError ? (nickNameValidError ? "" : "이미 있는 닉네임입니다.") : "영어와 숫자로만 입력해주세요.")}
        />
        <div className={classes.EmailLabel}>
          <label >
            <p>이메일</p>
            <div className={classes.EmailInput}>
              <input
                type="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChange={setEmail}
                onBlur={checkEmail}
              />
          <button onClick={confirmEmail} className={classes.EmailInputBtn}>인증 번호 전송</button>
            </div>
          </label>
          <p className={classes.ErrorMessage}>{(emailEffectError ? (emailValidError ? "" : "이미 있는 이메일입니다.") : "이메일 양식을 지켜주세요.")}</p>
        </div>   

        <div className={classes.EmailNumLabel}>
          <label >
            <p>이메일 인증 번호</p>
            <div className={classes.EmailNumInput}>
              <input
                type="text"
                value={inputCode}
                onChange={(event)=> setInputCode(event.target.value)}
                placeholder="이메일 인증 번호를 입력해주세요"
              />
              <button onClick={checkEmailCode} className={classes.EmailNumBtn}>인증</button>
            </div>
          </label>
        </div> 
        <InputLabel
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={(passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요.")}
        />
        <InputLabel
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={setConfirmPassword}
          errorMessage={(confirmPasswordError ? "" : "비밀번호가 일치하지 않습니다.")}        
        />
        <p className={classes.GenderP}>성별</p>
        <label className={classes.Gender}>
          남
          <input
            type="checkbox"
            checked={male}
            onChange={setMale}
          />
        </label>
        <label className={classes.Gender}>
          여
          <input
            type="checkbox"
            checked={female}
            onChange={setFemale}
          />
        </label>
        <br /><br /><br /><br />
        <button type="submit" disabled={!submitError} className={classes.SignupBtn}>회원가입</button>
      </form>
      <br />
      <label onClick={toLogin}>로그인 하러 가기</label>
    </div>
  )
}
export default UserSignup;