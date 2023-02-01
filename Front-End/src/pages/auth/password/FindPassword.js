import axios from "axios";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";
import classes from "./FindPassword.module.css"
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import InputShortLabel from "../component/InputShortLabel";

const FindPassword = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [email, setEmail, emailError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);
  
  const FindPasswordChangeSubmit = (event) => {
    event.preventDefault()
    console.log(email)
    const url = "http://43.201.72.251:8082/user/findpw"
    axios.get(
      url,{
        params: {
          userId: id,
          userEmail: email
        }
      }
    ).then(response => {
      if (response.status===200){
        console.log(response.data.data);
        dispatch(authActions.passwordReset(response.data.data))
      }else{
        console.log(response);
        window.alert("아이디와 이메일을 확인해주세요")
      }
    }).catch(error =>{
      console.log(error);
    })
  }
  const toSetNewPassword = (event) => {
    event.preventDefault();
    navigate("/auth/setnewpassword")
  }

  return(
    <div>
      <h1 className={classes.PageName}>비밀번호 찾기</h1>
      <br/><br/>
      <form>
        <InputLabel
          label="아이디"
          type="text"
          value={id}
          onChange={setId}
          placeholder="아이디를 입력해주세요"
          errorMessage={(idError ? "" : "영어와 숫자로만 입력해주세요.")}
        />
        <InputShortLabel
          label="이메일"
          buttonName="이메일 전송"
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={setEmail}
          onClick={FindPasswordChangeSubmit}
          errorMessage={(emailError ? "" : "이메일 양식을 지켜주세요.")}
        />
        <InputShortLabel
          label="이메일 인증번호"
          buttonName="인증"
          type="text"
          placeholder="인증번호를 입력해주세요"
          onClick={toSetNewPassword}
        />         
      </form>
    </div>
  )
}

export default FindPassword 