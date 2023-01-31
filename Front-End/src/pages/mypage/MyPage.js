import classes from './MyPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const MyPage = () =>{
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const userId = useSelector((state) => state.auth.userId)
  const userData = useSelector((state) => state.auth.userData)

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
        console.log(response.data.data)
      }else{
        window.alert("회원정보가 없습니다.")
      }
    }).catch(error =>{
      console.log(error);
    })    
  }
  return(
    <div className={classes.MyPage}>
      <h1>My Page</h1>
      <button onClick={getMyData}>클릭!</button>
      <h1>My Page</h1>
      <p>{userData.userId}</p>
      <p>{userData.userNickname}</p>
      <p>{userData.userEmail}</p>
    </div>
  )
}

export default MyPage