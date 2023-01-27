import InputLabel from "../component/InputLabel";
import { DataInput, CheckPassword } from "../component/Effectiveness";


const setNewPassword = () => {
  const [newPassword, setNewPassword, newPasswordError] = DataInput(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/);
  const [confirmNewPassword, setConfirmNewPassword, confirmNewPasswordError] = CheckPassword(newPassword);
  
};