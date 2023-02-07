import InputLabel from "../auth/component/InputLabel"
import { DataInput } from "../auth/component/Effectiveness"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions } from "../../store/auth"
import Swal from "sweetalert2"
import classes from './AdminLogin.module.css'

const AdminLogin = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [password, setPassword, passwordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );

  const AdminLogin = (event) =>{
    event.preventDefault();
    const url = 'https://i8d105.p.ssafy.io/be/admin/login'
    axios.post(
      url,
      {
        adminId : id,
        adminPw : password
      }
    ).then((response)=>{
      if (response.status===200){
        dispatch(authActions.adminLogin(response.data))
        const token = response.data.auth_token
        axios.get(
          'https://i8d105.p.ssafy.io/be/admin/list',
          {
            headers:{ Authorization : token }
          }).then((response)=>{
            dispatch(authActions.getConsultantList(response.data.data))
            navigate('/manageconsultant')
          }).catch((error)=>{
            console.log(error);
          })
      }else{
        Swal.fire({
          title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인 실패!<div>', 
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">아이디와 비밀번호를 다시 확인해주세요</div>', 
          width : 330,
          icon: 'error',
          confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          confirmButtonColor: '#9A9A9A',
        })
        console.log(response);
      }
    }).catch((error)=>{
      console.log(error);
      window.alert("서버와 연결이 끊겼습니다.");
    })
  }

  const nullError = !!id && !!password;
  const effectivnessError = idError && passwordError;
  const submitError = nullError && effectivnessError;

  return(
    <div>
      <h1 className={classes.PageName}>Admin Login</h1>
      <form onSubmit={AdminLogin}>
        <InputLabel
          label="아이디"
          type="text"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={setId}
          errorMessage={idError ? "" : "영어와 숫자로만 이루어져있어야합니다."}
        />
        <InputLabel
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={
            passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요."
          }
        />
        <button
          type="submit"
          disabled={!submitError}
          className={classes.LoginBtn}
        >
          로그인
        </button>
      </form>
    </div>
  )
}

export default AdminLogin;