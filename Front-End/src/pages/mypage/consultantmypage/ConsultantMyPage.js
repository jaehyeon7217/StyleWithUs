import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
import axios from "axios";
import Swal from "sweetalert2";
// component
import ConsultantMyPageSideBar from "./ConsultantMyPageSideBar";
import GetStarRating from "../../consultant/video/VideoUser/reviewinput/GetStarRating";
// img
import consultantMan from "../../../assets/consultantman.png";
import consultantWoman from "../../../assets/consultantwoman.png";
// css style
import classes from "./ConsultantMyPage.module.css";

const ConsultantMyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);

  const getMyData = () => {
    const url = "https://i8d105.p.ssafy.io/be/consultant/get/" + consultantId;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(authActions.getMyData(response.data.data));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
            width: 330,
            icon: "error",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: "#9A9A9A",
          }).then(() => {
            navigate("/");
            dispatch(authActions.logout(""));
          });
        }
      });
  };

  const showConsultantReview = () => {
    const url =
      "https://i8d105.p.ssafy.io/be/review/show/consultant/" + consultantId;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(authActions.getMyReview(response.data));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
            width: 330,
            icon: "error",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: "#9A9A9A",
          }).then(() => {
            navigate("/");
            dispatch(authActions.logout(""));
          });
        }
      });
  };

  useEffect(() => {
    getMyData();
    showConsultantReview();
  });

  // 리뷰페이지로 이동
  const ReviewPage = (event) => {
    event.preventDefault();
    navigate("/consultantreivewpage");
  };

  // 프로필페이지로 이동
  const ProfilePage = (event) => {
    event.preventDefault();
    navigate("/consultantmyprofile");
  };

  const toPasswordChange = (event) => {
    event.preventDefault();
    navigate("/passwordchange");
  };

  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <div className={classes.MyPage}>
        <ConsultantMyPageSideBar />
        <div className={classes.mainBox}>
          <h3 className={classes.MainTitle}>회원 정보</h3>
          <div className={classes.MyInformBox}>
            <p>
              {data.consultantGender ? (
                <img
                  src={consultantMan}
                  className={classes.consultantMan}
                  alt="consultantMan"
                />
              ) : (
                <img
                  src={consultantWoman}
                  className={classes.consultantWoman}
                  alt="consultantWoman"
                />
              )}
            </p>
            <div>
              <div className={classes.HelloText}>
                <p className={classes.consultantNickname}>
                  {data.consultantNickname}
                </p>
                <p className={classes.Hello}>님 안녕하세요,</p>
              </div>
              <div className={classes.consultantEmail}>
                <p>{data.consultantEmail}</p>
              </div>
              <div>
                <button
                  className={classes.myinformbtnone}
                  onClick={ProfilePage}
                >
                  프로필 정보
                </button>
                <button
                  className={`${classes.myinformbtnone} ${classes.btntwo}`}
                  onClick={toPasswordChange}
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
            <p className={classes.userType}>회원유형</p>
            <div className={classes.Vline}></div>
            <p className={classes.userTypeDap}>컨설턴트</p>
          </div>
          <div className={classes.consultantResumeBox}>
            <div className={classes.resumetitlebox}>
              <h3 className={classes.MainTitle}>나의 경력</h3>
              <p onClick={ProfilePage} className={classes.viewmore}>
                더보기
              </p>
            </div>
            <div className={classes.ResumeBox}>
              <p className={classes.ResumeName}>경력</p>
              <div className={classes.vline}></div>
              <p className={classes.consultantResume}>
                {data.consultantResume}
              </p>
            </div>
          </div>
          <br />
          <div>
            <div className={classes.RevieBox}>
              <h3 className={classes.MainTitle}>나의 리뷰</h3>
              <p onClick={ReviewPage} className={classes.viewmore}>
                더보기
              </p>
            </div>
            <div className={classes.ReviewAllBox}>
              {review.slice(0, 2).map((item, idx) => {
                return (
                  <div key={idx} className={classes.ReviewBox}>
                    <div className={classes.ReviewOne}>
                      <GetStarRating
                        reviewScore={review[idx].reviewScore}
                        className={classes.star}
                      />
                      <p className={classes.reviewScore}>
                        {review[idx].reviewScore}
                      </p>
                      <p className={classes.userId}>{review[idx].userId}</p>
                      <p className={classes.userDate}>
                        {review[idx].reviewRegisterTime[0]}.
                        {review[idx].reviewRegisterTime[1]}.
                        {review[idx].reviewRegisterTime[2]}
                      </p>
                    </div>
                    <div className={classes.reviewContent}>
                      <p>{review[idx].reviewContent}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantMyPage;
