import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
// 컴포넌트 호출
import InputLabel from "../component/InputLabel";
import InputShortLabel from "../component/InputShortLabel";
import {
  DataInput,
  CheckPassword,
  ConsultantValidCheck,
} from "../component/Effectiveness";
import { GenderCheckbox } from "../component/GenderCheckbox";
import ModalBasic from "../component/ModalBasic";
// classess 호출
import classes from "./ConsultantSignUp.module.css";

const ConsultantSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId, idEffectError] = DataInput(/^[a-zA-z0-9]{5,20}$/);
  const [name, setName, nameError] = DataInput(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/);
  const [nickName, setNickName, nickNameEffectError] =
    DataInput(/^[a-zA-z0-9]{3,20}$/);
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

  const [resume, setResume] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [idValidError, checkId] = ConsultantValidCheck("id");
  const [emailValidError, checkEmail] = ConsultantValidCheck("email");
  const [nickNameValidError, checkNickname] = ConsultantValidCheck("nickname");

  // 컨설턴트 회원가입 api 요청
  const consultantSignUpsubmit = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/consultant/register";
    axios
      .post(url, {
        consultantId: id,
        consultantName: name,
        consultantNickname: nickName,
        consultantEmail: email,
        consultantPw: password,
        consultantGender: male ? 1 : 0,
        consultantResume: "resume",
        consultantApproval: 1,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/auth/login");
        } else {
          window.alert("입력항목을 다시 체크해주세요");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
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
    } else {
      setEmailOk(false);
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

  return (
    <div>
      <h1 className={classes.PageName}>회원 가입</h1>
      <br />
      <form onSubmit={consultantSignUpsubmit}>
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
          placeholder="닉네임을 입력해주세요"
          onChange={setNickName}
          onBlur={checkNickname}
          errorMessage={
            nickNameEffectError
              ? nickNameValidError
                ? ""
                : "이미 있는 닉네임입니다."
              : "영어와 숫자로만 입력해주세요."
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
          onChange={(event) => setInputCode(event.target.value)}
          onClick={checkEmailCode}
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
        <label onClick={showModal} className={classes.ShowModal}>
          경력 기술서 입력하기
        </label>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
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
export default ConsultantSignUp;
