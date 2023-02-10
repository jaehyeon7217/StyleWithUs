import {useSelector } from "react-redux";
import classes from './ConsultantReviewPage.module.css';
import GetStarRating from '../../consultant/video/VideoUser/reviewinput/GetStarRating';
import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import { useState } from "react";
import { useEffect } from "react";
import consultantWoman from '../../../assets/consultantwoman.png';
import consultantman from '../../../assets/consultantman.png'


const ConsultantReviewPage = () => {
    const consultantId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.auth.userData);
    const review = useSelector((state) => state.auth.myReviewList);
    const reviewAvg = useSelector((state) => state.auth.reviewAvg);

    const [msg, setMsg] = useState("");

    const reviewMsg = () =>{
        if (reviewAvg === 5){
        setMsg("당신은 완벽한 컨설턴트!")
        }else if(reviewAvg>=4){
        setMsg("당신은 우수 컨설턴트!")
      } else if (reviewAvg >=3){
        setMsg("당신은 조금만 더 노력하면 우수 컨설턴트!")
      } else if(reviewAvg >=2){
        setMsg("당신은 분발해야 하는 컨설턴트!")
      } else if (reviewAvg >=0){
        setMsg("당신은 해고 위기 컨설턴트!")
      }
    }
    
    useEffect(()=>{
      reviewMsg();
    },[])

    return(
        <div className={classes.ReviewPage}>
            <ConsultantMyPageSideBar />
            <div className={classes.ReviewMainBox}>
                <h3 className={classes.MyReviewName}>나의 리뷰</h3>
                <hr className={classes.hr}/>
                <div className={classes.ImgTextBox}>
                    <p >{(data.consultantGender ? <img src={consultantman} className={classes.consultantman} /> : <img src={consultantWoman} className={classes.consultantWoman} />)}</p>
                    <div>
                        <p className={classes.reviewAvg}>나의 점수 {reviewAvg}</p>
                        <p className={classes.msg}>{msg}</p>
                    </div>
                </div>
                <hr className={classes.hrgrey} />
                {review.map((item, idx) => {
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
    )
}

export default ConsultantReviewPage;