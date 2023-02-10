import { useDispatch ,useSelector } from "react-redux";
import { authActions } from "../../../store/auth";
import axios from "axios";
import { useEffect } from "react";
import classes from './ConsultantMyPage.module.css'
import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import consultantMan from '../../../assets/consultantman.png';
import consultantWoman from '../../../assets/consultantwoman.png';
import GetStarRating from '../../consultant/video/VideoUser/reviewinput/GetStarRating';
import { useNavigate } from "react-router-dom";


const ConsultantMyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);

  const getMyData = () =>{
    const url = "https://i8d105.p.ssafy.io/be/consultant/get/" + consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization : token
        }
      }
    ).then(response => {
      if (response.status===200){
        dispatch(authActions.getMyData(response.data.data))
      }
    }).catch(error =>{
      console.log(error);
    })    
  };

  const showConsultantReview = () => {
    const url = "https://i8d105.p.ssafy.io/be/review/show/consultant/" + consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization: token
        }
      }
    ).then(response=>{
      if (response.status==200){
        dispatch(authActions.myReviewList(response.data))
      }
    }).catch(error => {
      console.log(error);
    })
  };



  useEffect(() => {
    getMyData();
    showConsultantReview();
  }, []);

  // 리뷰페이지로 이동
  const ReviewPage = (event) => {
    event.preventDefault();
    navigate("/consultantreivewpage")
  }


  return(
    <div>
      <div className={classes.MyPage}>
        <ConsultantMyPageSideBar/>
        <div className={classes.mainBox}>
          <h3 className={classes.MainTitle}>회원 정보</h3>
          <div className={classes.MyInformBox}>
            <p >{(data.userGender ? <img src={consultantMan} className={classes.consultantman} /> : <img src={consultantWoman} className={classes.consultantWoman} />)}</p>
            <div>
              <div className={classes.HelloText}>
                <p className={classes.consultantNickname}>{data.consultantNickname }</p>
                <p className={classes.Hello}>님 안녕하세요,</p>
              </div>
              <div className={classes.consultantEmail}><p>{data.consultantEmail}</p></div>
              <div>
                <button className={classes.myinformbtnone}>프로필 정보</button>
                <button className={classes.myinformbtntwo}>비밀번호 변경</button>
              </div>
            </div>
          </div>
          <h3 className={classes.MainTitle}>나의 경력</h3>
          <p>{data.consultantResume}</p>
          <div>
            <div className={classes.RevieBox}>
              <h3 className={classes.MainTitle}>나의 리뷰</h3>
              <p onClick={ReviewPage}>더보기</p>
            </div>
            <p></p>
            <div className={classes.ReviewAllBox}>
              {review.slice(0, 2).map((item, idx) => {
                return (
                  <div key={idx} className={classes.ReviewBox}>
                    <div className={classes.ReviewOne}>
                      <GetStarRating reviewScore={review[idx].reviewScore} className={classes.star} />
                      <p className={classes.reviewScore}>{review[idx].reviewScore}</p>
                      <p className={classes.userId}>{review[idx].userId}</p>
                      <p className={classes.userDate}>{review[idx].reviewRegisterTime[0]}.{review[idx].reviewRegisterTime[1]}.{review[idx].reviewRegisterTime[2]}</p>
                    </div>
                    <div className={classes.reviewContent}>
                      <p>{review[idx].reviewContent}</p>
                    </div >
                    {/* <div className={classes.borderbottom}></div> */}
                    
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>


      
     
    </div>
  );
};

export default ConsultantMyPage;