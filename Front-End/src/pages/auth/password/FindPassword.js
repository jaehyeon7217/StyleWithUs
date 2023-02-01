import axios from "axios";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";
import classes from "./FindPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
import InputShortLabel from "../component/InputShortLabel";
import { useState } from "react";

const FindPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [email, setEmail, emailError] = DataInput(
    /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  );
  const [code, setCode] = useState("")

  const FindPasswordChangeSubmit = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/user/findpw";
    axios.post(
        url, 
        {
          userId: id,
          userEmail: email
        })
      .then((response) => {
        if (response.status === 200) {
          const data = { code: response.data.data, id: id };
          dispatch(authActions.passwordReset(data));
          window.alert("이메일 코드가 전송 되었습니다.")
        } else {
          window.alert("아이디와 이메일을 확인해주세요");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const resetCode = useSelector((state)=> state.auth.resetCode.code)
  const toSetNewPassword = (event) => {
    event.preventDefault();
    if (resetCode === code){
      navigate("/auth/setnewpassword");
    }else{
      window.alert("코드 다시 확인하세요")
    }
  };

  return (
    <div>
      <h1 className={classes.PageName}>비밀번호 찾기</h1>
      <br />
      <br />
      <form>
        <InputLabel
          label="아이디"
          type="text"
          value={id}
          onChange={setId}
          placeholder="아이디를 입력해주세요"
          errorMessage={idError ? "" : "영어와 숫자로만 입력해주세요."}
        />
        <InputShortLabel
          label="이메일"
          buttonName="이메일 전송"
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={setEmail}
          onClick={FindPasswordChangeSubmit}
          errorMessage={emailError ? "" : "이메일 양식을 지켜주세요."}
        />
        <InputShortLabel
          label="이메일 인증번호"
          buttonName="인증"
          type="text"
          placeholder="인증번호를 입력해주세요"
          value={code}
          onChange={(event)=> {setCode(event.target.value)}}
          onClick={toSetNewPassword}
        />
      </form>
    </div>
  );
};

export default FindPassword;
