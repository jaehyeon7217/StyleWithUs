import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css"

const NotFound = () =>{
  const navigate = useNavigate();

  const toHome = (event) =>{
    event.preventDefault();
    navigate('/')
  }

  return(
    <div className={classes.notfoundBox}>
      <h1>404 ERROR</h1>
      <br />
      <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <p>존재하지 않는 주소를 입력하셨거나</p>
      <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
      <button onClick={toHome}>홈으로</button>
    </div>
  )
}

export default NotFound;