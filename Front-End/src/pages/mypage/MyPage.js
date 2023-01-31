import classes from './MyPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MyPage = () =>{
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const userId = useSelector((state) => state.auth.userId)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();

  const getMyData = (event) =>{
    event.preventDefault();
    const url = "http://192.168.100.82/user/get/" + userId
    axios.get(
      url,
      {
        headers:{
          auth_token : token
        }
      }
    ).then(response => {
      if (response.status===200){
        dispatch(authActions.getMyData(response.data.data))
      }else{
        window.alert("회원정보가 없습니다.")
      }
    }).catch(error =>{
      console.log(error);
    })    
  }

  // 비밀번호 변경 페이지 이동
  const SetNewPassword = (event) =>{
    event.preventDefault();
    navigate("/auth/findpassword")
    
  }

  // // 비밀번호 찾기 페이지 이동
  // const FindPassword = (event) => {
  //   event.preventDefault();
  //   navigate("/auth/findpassword")
  // }


  return(
    <div className={classes.MyPage}>
      <br /><br /><br /><br />
      {/* <button onClick={getMyData}>클릭</button> */}
      <h1 className={classes.PageName}>마이 페이지</h1>
      <br />
      <div className={classes.UserBox}>
        <div className={classes.UserCircle}>User</div>
        <div className={classes.userNicknameBox}>
        <p className={classes.UserDataBox}>{userData.userNickname}</p>
          <p className={classes.UserDataBoxHi}>님 안녕하세요,</p><br /><br />
        <div className={classes.UserData}>
          <div className={classes.userId}>{userData.userId}</div>
          <div className={classes.userEmail}>{userData.userEmail}</div>
            <button className={classes.UserBtn} onClick={SetNewPassword}>회원정보 수정</button>
        </div>
        </div>
      </div>
      <br />
      <div className={classes.MyBodyBox}>
        <p>나의 체형</p>
      </div>
      {/* <p>관심 상품</p> */}
    </div>
  )
}

export default MyPage