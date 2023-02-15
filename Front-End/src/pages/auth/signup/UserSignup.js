import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
// component 호출
import InputLabel from "../component/InputLabel";
import InputShortLabel from "../component/InputShortLabel";
import {
  DataInput,
  CheckPassword,
  UserValidCheck,
} from "../component/Effectiveness";
import { GenderCheckbox } from "../component/GenderCheckbox";
// classes 호출
import classes from "./UserSignUp.module.css";

const UserSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId, idEffectError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [name, setName, nameError] = DataInput(/^[가-힣]{2,10}$/);
  const [nickName, setNickName, nickNameEffectError] =
    DataInput(/^[a-zA-z0-9가-힣]{3,20}$/);
  const [email, setEmail, emailEffectError] = DataInput(
    /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  );
  const [password, setPassword, passwordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );
  const [confirmPassword, setConfirmPassword, confirmPasswordError] =
    CheckPassword(password);
  const [male, female, setMale, setFemale] = GenderCheckbox();
  const [inputCode, setInputCode] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const inputCodeError = !inputCode;

  const [idValidError, checkId] = UserValidCheck("id");
  const [emailValidError, checkEmail] = UserValidCheck("email");
  const [nickNameValidError, checkNickname] = UserValidCheck("nickname");

  // 유저 회원가입 api 요청
  const userSignupSubmit = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/user/register";
    axios
      .post(url, {
        userId: id,
        userPw: password,
        userName: name,
        userNickname: nickName,
        userEmail: email,
        userGender: male ? 1 : 0,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">회원가입 성공<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">가입한 아이디와 비밀번호로 로그인해주세요</div>',
            icon: "success",
            width: 330,
            confirmButtonColor: "#9A9A9A",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          }).then(() => {
            navigate("/auth/login");
          });
        } else {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">회원가입 실패</div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">입력 항목을 다시 체크해주세요!</div>',
            icon: "error",
            width: 330,
            confirmButtonColor: "#9A9A9A",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmEmail = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/mail";
    axios
      .post(url, {
        email: email,
      })
      .then((response) => {
        dispatch(authActions.validEmail(response.data.data));
        Swal.fire({
          title:
            '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">이메일이 발송되었습니다!<div>',
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">회원가입을 계속 진행해주세요!</div>',
          icon: "success",
          width: 330,
          confirmButtonColor: "#9A9A9A",
          confirmButtonText:
            '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailCode = useSelector((state) => state.auth.confirmEmail);
  const checkEmailCode = (event) => {
    event.preventDefault();
    if (inputCode === emailCode) {
      setEmailOk(true);
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">인증 완료<div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">회원가입을 계속 진행해주세요!</div>',
        icon: "success",
        width: 330,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
      });
    } else {
      setEmailOk(false);
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">인증 실패!</div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">인증 코드를 다시 확인해주세요</div>',
        icon: "error",
        width: 330,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
      });
    }
  };

  const toLogin = (event) => {
    event.preventDefault();
    navigate("/auth/login");
  };
  const idError = idEffectError && idValidError;
  const nickNameError = nickNameEffectError && nickNameValidError;
  const emailError = emailEffectError && emailValidError;

  // sumbit 활성화 & 비활성화
  const nullError =
    !!id && !!name && !!nickName && !!email && !!password && !!confirmPassword;
  const effectivnessError =
    idError &&
    nameError &&
    nickNameError &&
    emailError &&
    passwordError &&
    confirmPasswordError;
  const submitError = nullError && effectivnessError && emailOk;

  useEffect(() => {
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
    document.querySelector(`#AuthBox`).style.height="auto"
  }, []);


  return (
    <div className={classes.userSignUp}>
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
          errorMessage={
            idEffectError
              ? idValidError
                ? ""
                : "이미 있는 아이디입니다."
              : "영어와 숫자로만 입력해주세요."
          }
        />
        <InputLabel
          label="이름"
          type="text"
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={setName}
          errorMessage={nameError ? "" : "한글로만 입력해주세요"}
        />
        <InputLabel
          label="닉네임"
          type="text"
          value={nickName}
          placeholder="세글자 이상의 닉네임을 입력해주세요"
          onChange={setNickName}
          onBlur={checkNickname}
          errorMessage={
            nickNameEffectError
              ? nickNameValidError
                ? ""
                : "이미 있는 닉네임입니다."
              : "영어, 한글, 숫자로만 입력해주세요."
          }
        />
        <InputShortLabel
          label="이메일"
          buttonName="이메일 전송"
          type="text"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={setEmail}
          onBlur={checkEmail}
          disabled={!emailError}
          errorMessage={
            emailEffectError
              ? emailValidError
                ? ""
                : "이미 있는 이메일입니다."
              : "이메일 양식을 지켜주세요."
          }
          onClick={confirmEmail}
        />
        <InputShortLabel
          label="이메일 인증 번호"
          buttonName="인증"
          type="text"
          value={inputCode}
          placeholder="이메일 인증 번호를 입력해주세요"
          disabled={inputCodeError}
          onChange={(event) => setInputCode(event.target.value)}
          onClick={checkEmailCode}
        />
        <InputLabel
          label="비밀번호"
          type="password"
          value={password}
          placeholder="9자 이상 16자 이하의 비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={
            passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요."
          }
        />
        <InputLabel
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={setConfirmPassword}
          errorMessage={
            confirmPasswordError ? "" : "비밀번호가 일치하지 않습니다."
          }
        />
        <p className={classes.GenderP}>성별</p>
        <label className={classes.Gender}>
          남
          <input type="checkbox" checked={male} onChange={setMale} />
        </label>
        <label className={classes.Gender}>
          여
          <input type="checkbox" checked={female} onChange={setFemale} />
        </label>
        <br />
        <br />
        <br />
        <br />
        <button
          type="submit"
          disabled={!submitError}
          className={classes.SignupBtn}
        >
          회원가입
        </button>
      </form>
      <br />
      <label onClick={toLogin} className={classes.ToLoginLink}>
        로그인 하러 가기
      </label>
    </div>
  );
};
export default UserSignup;
