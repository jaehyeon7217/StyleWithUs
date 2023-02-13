import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// redux 호출
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
// component 불러오기
import InputLabel from "../component/InputLabel";
import { DataInput, CheckPassword } from "../component/Effectiveness";
import classes from "./PasswordChange.module.css";

const PasswordChange = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);

  const [password, setPassword, passwordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );
  const [newPassword, setNewPassword, newPasswordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );
  const [confirmNewPassword, setConfirmNewPassword, confirmNewPasswordError] =
    CheckPassword(newPassword);

  const PasswordChangeSubmit = (event) => {
    event.preventDefault();
    const url = userType
      ? "https://i8d105.p.ssafy.io/be/consultant/password"
      : "https://i8d105.p.ssafy.io/be/user/password";
    axios
      .post(
        url,
        userType
          ? {
              consultantId: id,
              consultantPw: password,
              newConsultantPw: newPassword,
            }
          : { userId: id, userPw: password, newUserPw: newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">변경 성공<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">새로운 비밀번호로 로그인해주세요</div>',
            width: 330,
            icon: "success",
            confirmButtonColor: "#9A9A9A",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          }).then(() => {
            navigate("/auth/login");
            dispatch(authActions.logout(""));
          });
        } else {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">변경 실패<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">비밀번호를 다시 확인해주세요</div>',
            width: 330,
            icon: "error",
            confirmButtonColor: "#9A9A9A",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title:
            '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">변경 실패<div>',
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">비밀번호를 다시 확인해주세요</div>',
          width: 330,
          icon: "error",
          confirmButtonColor: "#9A9A9A",
          confirmButtonText:
            '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
        });
      });
  };

  // sumbit 활성화 & 비활성화
  const nullError = !!password && !!newPassword && !!confirmNewPassword;
  const effectivnessError =
    passwordError && newPasswordError && confirmNewPasswordError;
  const submitError = nullError && effectivnessError;

  return (
    <div className={classes.AuthBox}>
      <div className={classes.AuthBody}>
      <h1 className={classes.PageName}>비밀번호 변경</h1>
      <br />
      <br />
      <form onSubmit={PasswordChangeSubmit}>
        <InputLabel
          label="기존 비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={setPassword}
          errorMessage={
            passwordError ? "" : "영어와 숫자 그리고 특수문자로만 입력해주세요."
          }
        />
        <InputLabel
          label="새로운 비밀번호"
          type="password"
          value={newPassword}
          placeholder="비밀번호를 입력해주세요"
          onChange={setNewPassword}
          errorMessage={
            newPasswordError
              ? ""
              : "영어와 숫자 그리고 특수문자로만 입력해주세요."
          }
        />
        <InputLabel
          label="비밀번호 확인"
          type="password"
          value={confirmNewPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={setConfirmNewPassword}
          errorMessage={
            confirmNewPasswordError ? "" : "새로운 비밀번호와 다릅니다."
          }
        />
        <button
          type="submit"
          disabled={!submitError}
          className={classes.PasswordChangeBtn}
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  </div>
  );
};

export default PasswordChange;
