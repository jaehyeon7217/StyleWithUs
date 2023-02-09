import classes from './ConsultantMyPageSideBar.module.css'
import { useNavigate } from "react-router-dom";

const ConsultantMyPageSideBar = () => {
    const navigate = useNavigate();

     // 프로필 정보 페이지로 이동
    const toServiceCenter = (event) => {
        event.preventDefault()
        navigate('/servicecenter')
    }

    return(
        <div className={classes.SideBar}>
            <h1 className={classes.PageName}>마이 페이지</h1>
            <h3 className={classes.SideBarName}>내 정보</h3>
            <h1 className={classes.SidBarNameSmall}>경력 기술서</h1>
            <h3 className={classes.SidBarNameSmall}>리뷰</h3>
            <h1 className={classes.SideBarName}>고객 센터</h1>
            <h3 className={classes.SidBarNameSmall} onClick={toServiceCenter}>자주 묻는 질문</h3>

        </div>
    )


}

export default ConsultantMyPageSideBar;