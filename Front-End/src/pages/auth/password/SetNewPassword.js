import axios from "axios";
import InputLabel from "../component/InputLabel";
import classes from "./SetNewPassword.module.css";
import { DataInput, CheckPassword } from "../component/Effectiveness";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const navigate = useNavigate();
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
    const url = "https://i8d105.p.ssafy.io/be/findpw/changepw";
    axios
      .put(url, {
        userId: "",
        userPw: newPassword,
      })
      .then((response) => {
        console.log(response);
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
