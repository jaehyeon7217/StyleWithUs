import axios from "axios";
import { useState } from "react";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";

const FindPassword = () =>{
  const navigate = useNavigate();
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [email, setEmail, emailError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);

  const FindPasswordChangeSubmit = (event) => {
    event.preventDefault()
    const url = "http://192.168.100.82/user/findpw?"+"userId="+{id}+"&userEmail="+{email}
    axios.get(
      url,
    ).then(response => {
      if (response.request===200){
        
      }else{
        window.alert("아이디와 이메일을 확인해주세요")
      }
    })
  }

  const confirmEmail = (event) => {
    event.preventDefault();
    const url = "http://192.168.100.81/mail"
    axios.post(
      url,
      {
        email: email,
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const toSetNewPassword = (event) => {
    event.preventDefault();
    navigate("/auth/setnewpassword")

  }

  return(
    <div>
      <h2>비밀번호 찾기</h2>
      <form>
        <InputLabel
          label="ID"
          type="text"
          placeholder="아이디를 입력해주세요"
        />
        <InputLabel
          label="email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <br />
        <button onClick={confirmEmail}>이메일 전송</button>
        <br />
        <label id="inputEmail">이메일 인증번호</label><br />
        <input type="text" id="inputEmail"/>
        <button onClick={toSetNewPassword}>인증</button>

      </form>
    </div>
  )
}

export default FindPassword 