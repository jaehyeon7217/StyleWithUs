import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
// custom hook
import { DataInput, CheckPassword } from "../component/Effectiveness";
// component
import InputLabel from "../component/InputLabel";
// css style
import classes from "./SetNewPassword.module.css";

const SetNewPassword = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = location.state.isUser;
  const id = useSelector((state) => state.auth.resetCode.id);
  const [newPassword, setNewPassword, newPasswordError] = DataInput(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/
  );
  const [confirmNewPassword, setConfirmNewPassword, confirmNewPasswordError] =
    CheckPassword(newPassword);

  const nullError = !!newPassword && !!confirmNewPassword;
  const effectivnessError = newPasswordError && confirmNewPasswordError;
  const submitError = nullError && effectivnessError;

  const sendNewpassword = (event) => {
    event.preventDefault();
    const url = isUser
      ? "https://i8d105.p.ssafy.io/be/user/findpw/changepw"
      : "https://i8d105.p.ssafy.io/be/consultant/findpw/changepw";
    axios
      .put(
        url,
        isUser
          ? {
              userId: id,
              userPw: newPassword,
            }
          : {
              consultantId: id,
              consultantPw: newPassword,
            }
      )
      .then(() => {
        Swal.fire({
          title:
            '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">변경 완료!<div>',
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">새로운 비밀번호로 로그인해주세요</div>',
          width: 330,
          icon: "success",
          confirmButtonColor: "#9A9A9A",
          confirmButtonText:
            '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
        }).then(() => {
          navigate("/auth/login");
        });
      })
      .catch(() => {
        Swal.fire({
          title:
            '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">변경 실패!<div>',
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">비밀번호를 다시 확인해주세요</div>',
          width: 330,
          icon: "error",
          confirmButtonColor: "#9A9A9A",
          confirmButtonText:
            '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
        });
      });
  };

  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector(`#AuthBox`).style.height =
      "calc(var(--vh, 1vh) * 100 - 445px)";
  }, []);

  return (
    <div>
      <h1 className={classes.PageName}>새로운 비밀번호</h1>
      <br />
      <br />
      <form onSubmit={sendNewpassword}>
        <InputLabel
          label="새 비밀번호"
          type="password"
          value={newPassword}
          placeholder="새 비밀번호를 입력해주세요"
          onChange={setNewPassword}
          errorMessage={
            newPasswordError
              ? ""
              : "영어와 숫자 그리고 특수문자로만 입력해주세요."
          }
        />
        <InputLabel
          label="새 비밀번호 확인"
          type="password"
          value={confirmNewPassword}
          placeholder="새 비밀번호를 다시 입력해주세요"
          onChange={setConfirmNewPassword}
          errorMessage={
            confirmNewPasswordError ? "" : "비밀번호가 일치하지 않습니다."
          }
        />
        <button
          type="submit"
          disabled={!submitError}
          className={classes.SetNewPasswordBtn}
        >
          변경
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
