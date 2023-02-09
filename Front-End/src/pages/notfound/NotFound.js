import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css"

const NotFound = () =>{
  const navigate = useNavigate();

  const toHome = (event) =>{
    event.preventDefault();
    navigate('/')
  }

  return(
    <div className={classes["section1"]}>
      <h1>
        404
        <br />
        Not
        <br />
        Found
      </h1>
      <p className={classes["section1-p1"]}>죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <p className={classes["section1-p2"]}>
        존재하지 않는 주소를 입력하셨거나 <br/>
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <div className={classes.btn}>
        <button onClick={toHome}>
          <span className={classes['button-span']}>홈으로</span>
        </button>
      </div>
    </div>
  )
}

export default NotFound;