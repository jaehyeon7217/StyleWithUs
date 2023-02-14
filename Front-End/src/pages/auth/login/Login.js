import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { cartActions } from "../../../store/cart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// component 분리
import InputLabel from "../component/InputLabel";
import { DataInput } from "../component/Effectiveness";
// css 클래스
import classes from "./Login.module.css";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId, idError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [password, setPassword, passwordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );
  const [isUser, setIsUser] = useState(true);

  // 로그인 api 요청
  const loginSubmit = (event) => {
    event.preventDefault();
    const url = isUser
      ? "https://i8d105.p.ssafy.io/be/user/login"
      : "https://i8d105.p.ssafy.io/be/consultant/login";

    axios
      .post(
        url,
        isUser
          ? { userId: id, userPw: password }
          : { consultantId: id, consultantPw: password }
      )
      .then((response) => {
        if (response.status === 200) {
          if (isUser) {
            dispatch(authActions.userLogin(response.data));
            axios
            .get(`https://i8d105.p.ssafy.io/be/item/show/${response.data.data.userId}`, {
              headers: {
                Authorization: response.data.auth_token,
              },
            })
            .then((response) => {
              dispatch(cartActions.getCart(response.data.data));
            })
            .catch((error) => {
              if(error.response.status===401){
                Swal.fire({
                  title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>', 
                  html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>', 
                  width : 330,
                  icon: 'error',
                  confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
                  confirmButtonColor: '#9A9A9A',
                }).then(()=>{
                  navigate('/')
                  dispatch(authActions.logout(""))
                })
              }
            });
            navigate("/");
          } else {
            if (response.data.data.consultantApproval === 1) {
              dispatch(authActions.consultantLogin(response.data));
                axios.get(
                  "https://i8d105.p.ssafy.io/be/review/show/consultant/" + response.data.data.consultantId,
                  {
                    headers:{
                      Authorization : response.data.auth_token
                    }
                  }
                ).then((response2)=>{
                  dispatch(authActions.getMyReview(response2.data))
                }).catch((error)=>{
                  if(error.response.status===401){
                    Swal.fire({
                      title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>', 
                      html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>', 
                      width : 330,
                      icon: 'error',
                      confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
                      confirmButtonColor: '#9A9A9A',
                    }).then(()=>{
                      navigate('/')
                      dispatch(authActions.logout(""))
                    })
                  }
                })
              navigate("/");
            }
            else {
              Swal.fire({
                title:
                  '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인 실패<div>',
                html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">관리자의 승인까지 기다려주세요</div>',
                icon: "error",
                width: 330,
                confirmButtonText:
                  '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
              })
            }
          }
        }
        else {
          Swal.fire({
            title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인 실패!<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">아이디와 비밀번호를 다시 확인해주세요</div>',
            width: 330,
            icon: 'error',
            confirmButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: '#9A9A9A',
          })
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("서버와 연결이 끊겼습니다.");
      });
  };
  // toggleBtn
  const onChangeBtn = () => {
    setIsUser(!isUser);
  };
  // 회원가입 페이지 이동
  const toUserSignup = (event) => {
    event.preventDefault();
    navigate("/auth/signup");
  };
  // 비밀번호 찾기 페이지 이동
  const FindPassword = (event) => {
    event.preventDefault();
    navigate("/auth/findpassword", { state : { isUser: isUser, } });
  };

  // sumbit 활성화 & 비활성화
  const nullError = !!id && !!password;
  const effectivnessError = idError && passwordError;
  const submitError = nullError && effectivnessError;

  useEffect(() => {
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
  }, []);

  return (
    <div>
      <h1 className={classes.PageName}>STYLE WITH US</h1>
      <p className={classes.SubPageName}>Let's go check your style with us</p>
      <br />
      <br />
      <div className={classes.ToggleBtn}>
        <input
          type="checkbox"
          name="onoff-switch"
          id="onoff-switch1"
          onClick={onChangeBtn}
        />
        <label htmlFor="onoff-switch1"></label>
      </div>
      <form onSubmit={loginSubmit}>
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
          {isUser ? '유저 로그인' : '컨설턴트 로그인'}
        </button>
      </form>
      <br />
      <div className={classes.BottomLabelBox}>
        <p onClick={toUserSignup} className={classes.BottomLabel}>
          회원가입
        </p>
        <p className={classes.Vline}>I</p>
        <p onClick={FindPassword} className={classes.BottomLabel}>
          비밀번호 찾기
        </p>
      </div>

    </div>
  );
};

export default Login;