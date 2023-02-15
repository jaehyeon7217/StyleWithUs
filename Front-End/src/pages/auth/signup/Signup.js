import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import consultantIcon from "../../../assets/consultant.png"
import userIcon from "../../../assets/user.png"
import classes from "./Signup.module.css"
import consultantwoman from '../../../assets/consultantwomantwo.png'
import userwoman from '../../../assets/mypageuserwoman.png'



const SignUp = () => {                             
  
  const navigate = useNavigate();
  
  const toUserSignup = (event) =>{
    event.preventDefault();
    navigate('/auth/usersignup');
  }
  const toConsultantSignup = (event) =>{
    event.preventDefault();
    navigate('/auth/consultantsignup');
  }

  const toLogin = (event) => {
    event.preventDefault();
    navigate("/auth/login");
  };
  
  return(
    <div>
      <h1 className={classes.PageName}>회원 가입</h1>
      <br />
      <div className={classes.textbox}>
        <p>가입 유형</p>
        <p>정보 입력</p>
      </div>
      <div className={classes.imgbox}>
        <div className={classes.userbox}>
          <img src={userwoman} alt="img" onClick={toUserSignup} className={classes.userwoman}/>
          <p>일반 유저</p>
        </div>
        <div className={classes.marginbox}></div>
        <div className={classes.c}>
          <img src={consultantwoman} alt="img" onClick={toConsultantSignup} className={classes.consultantwoman}/>
          <p>컨설턴트</p>
        </div>
      </div>
      <br />
      <label onClick={toLogin} className={classes.ToLoginLink}>
        로그인 하러 가기
      </label>
    </div>
  )
}

export default SignUp