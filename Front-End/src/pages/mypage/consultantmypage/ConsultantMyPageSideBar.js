import { useNavigate } from "react-router-dom";
// css style
import classes from "./ConsultantMyPageSideBar.module.css";

const ConsultantMyPageSideBar = () => {
  const navigate = useNavigate();

  // 프로필 페이지로 이동
  const ProfilePage = (event) => {
    event.preventDefault();
    navigate("/consultantmyprofile");
  };

  // 리뷰페이지로 이동
  const ReviewPage = (event) => {
    event.preventDefault();
    navigate("/consultantreivewpage");
  };

  // 자주 묻는 질문 이동
  const Toservicecenter = (event) => {
    event.preventDefault();
    navigate("/consultantservicecenter");
  };

  // 마이페이지로 이동
  const MyPage = (event) => {
    event.preventDefault();
    navigate("/consultantmypage");
  };

  return (
    <div className={classes.SideBar}>
      <h1 className={classes.PageName} onClick={MyPage}>
        마이 페이지
      </h1>
      <h3 className={classes.SideBarName}>내 정보</h3>
      <h3 className={classes.SidBarNameSmall} onClick={ProfilePage}>
        프로필 정보
      </h3>
      <h3 className={classes.SidBarNameSmall} onClick={ReviewPage}>
        나의 리뷰
      </h3>
      <h1 className={classes.SideBarName}>고객 센터</h1>
      <h3 className={classes.SidBarNameSmall} onClick={Toservicecenter}>
        자주 묻는 질문
      </h3>
    </div>
  );
};

export default ConsultantMyPageSideBar;
