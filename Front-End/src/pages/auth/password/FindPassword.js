import axios from "axios";
// component 호출
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";
import classes from "./FindPassword.module.css"

const FindPassword = () =>{
  const navigate = useNavigate();
  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [email, setEmail, emailError] = DataInput(/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);

  const FindPasswordChangeSubmit = (event) => {
    event.preventDefault()
    const url = "http://192.168.100.82/user/findpw?userId="+id+"&userEmail="+email
    axios.get(
      url,
    ).then(response => {
      if (response.status===200){
        console.log(response.data.data);
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
      <form>
        <InputLabel
          label="ID"
          type="text"
          value={id}
          onChange={setId}
          placeholder="아이디를 입력해주세요"
          errorMessage={(idError ? "" : "영어와 숫자로만 입력해주세요.")}
        />
        <InputLabel
          label="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="이메일을 입력해주세요"
          errorMessage={(emailError ? "" : "이메일 양식을 지켜주세요.")}
        />
        <br/>
        <button onClick={FindPasswordChangeSubmit}>이메일 전송</button>
        <br />
        <label id="inputEmail" className={classes.EmailNumLabel}>이메일 인증번호</label><br />
        <input type="text" id="inputEmail"/>
        <button onClick={toSetNewPassword}>인증</button>

      </form>
    </div>
  )
}

export default FindPassword 