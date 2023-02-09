import classes from './ServiceCenterSideBar.module.css';
import { useNavigate } from "react-router-dom";

const ServiceCenterSideBar = () => {
    const navigate = useNavigate();

    
    const ServiceCenter = (event) => {
        event.preventDefault();
        navigate('/servicecenter')
    }

    const MyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }


    return(
        <div>
            <div className={classes.SideMenuBox}>
                <h1 className={classes.PageName} onClick={ServiceCenter}>고객 센터</h1>
                <h3 className={classes.SideMenuDetailTwo}>자주 묻는 질문</h3>
                <h3 className={classes.SideMenuDetail}>1:1 문의하기</h3>
            </div>
        </div>
    )
}

export default ServiceCenterSideBar;