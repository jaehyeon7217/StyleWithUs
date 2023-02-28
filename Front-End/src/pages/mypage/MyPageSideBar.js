import { useNavigate } from "react-router-dom";
// css style
import classes from "./MyPageSideBar.module.css";

const MyPageSideBar = () => {
  const navigate = useNavigate();

  // 관심 상품 페이지로 이동
  const MyPageWish = (event) => {
    event.preventDefault();
    navigate("/mypagewish");
  };

  // 프로필 페이지로 이동
  const MyProfile = (event) => {
    event.preventDefault();
    navigate("/myprofile");
  };

  // 마이페이지로 이동
  const MyPage = (event) => {
    event.preventDefault();
    navigate("/mypage");
  };

  // 고객 센터 페이지로 이동
  const ServiceCenter = (event) => {
    event.preventDefault();
    navigate("/servicecenter");
  };

  return (
    <div>
      <div className={classes.SideMenuBox}>
        <h1 className={classes.PageName} onClick={MyPage}>
          마이 페이지
        </h1>
        <h3 className={classes.SideMenu}>쇼핑 정보</h3>
        <h3 className={classes.SideMenuDetail} onClick={MyPageWish}>
          관심 상품
        </h3>
        <h3 className={classes.SideMenu}>내 정보</h3>
        <h3 className={classes.SideMenuDetail} onClick={MyProfile}>
          프로필 정보
        </h3>

        <h3 className={classes.SideMenu} onClick={ServiceCenter}>
          고객 센터
        </h3>
        <h3 className={classes.SideMenuDetail} onClick={ServiceCenter}>
          자주 묻는 질문
        </h3>
      </div>
    </div>
  );
};

export default MyPageSideBar;
