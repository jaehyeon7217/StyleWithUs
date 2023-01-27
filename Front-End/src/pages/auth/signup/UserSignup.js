import axios from "axios";
import { useState } from "react";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput, CheckPassword } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";
import GenderCheckbox from "../component/GenderCheckbox";
import ModalBasic from "../component/ModalBasic"


const UserSignup = () => {
  const navigate = useNavigate();
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [name, setName, nameError] = DataInput(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/);
  const [nickName, setNickName, nickNameError] = DataInput(/^[a-zA-z0-9]{3,20}$/);
  const [email, setEmail, emailError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);
  const [password, setPassword, passwordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [confirmPassword, setConfirmPassword, confirmPasswordError] = CheckPassword(password);
  const [gender, setGender] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // 유저 회원가입 api 요청
  const userSignupSubmit = (event) =>{
    event.preventDefault();
    const url = "http://192.168.100.81/user/register"
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
      navigate("/auth/login")
    }).catch(error =>{
      console.log(error);
    });
  };

  const idDuplicate = (event) => {
    event.preventDefault();
    const url = "http://192.168.100.81/user/valid/id/" + event.target.value;
    axios.get(url).then(response =>{
      console.log(response)}
    ).catch(error => {
      console.log(error)
    })
  }

  const confirmEmail = (event) =>{
    event.preventDefault();
    const url = "http://192.168.100.81/mail"
    axios.post(
      url,
      {
        email : email,
      }
    ).then(response=>{
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const toLogin = (event) => {
    event.preventDefault();
    navigate("/auth/login")

  }

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };



  // sumbit 활성화 & 비활성화
  const nullError = !!id && !!name && !!nickName && !!email && !!password && !!confirmPassword
  const effectivnessError = idError && nameError && nickNameError && emailError && passwordError && confirmPasswordError
  const submitError = nullError && effectivnessError

  return(
    <div>
      <form onSubmit={userSignupSubmit}>
        <InputLabel
          label="ID"
          type="text"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={(event) => {setId(event); idDuplicate(event);}}
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
        <button onClick={confirmEmail}>이메일 인증 번호 전송</button>
        <br />
        <br />
        <input type="text" />
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
          onChange={setConfirmPassword}
          errorMessage={(confirmPasswordError ? "" : "비밀번호가 일치하지 않습니다.")}        
        />
        <GenderCheckbox 
          label="gender"
          value={gender}
        />
        <br />
        <label onClick={showModal}>경력 기술서 입력하기</label>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen}/>}
        <br /><br />
        <button type="submit" disabled={!submitError}>회원가입</button>
      </form>
      <br />
      <label onClick={toLogin}>로그인 하러 가기</label>
    </div>
  )
}
export default UserSignup;