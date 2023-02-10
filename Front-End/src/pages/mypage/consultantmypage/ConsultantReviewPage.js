import {useSelector } from "react-redux";
import classes from './ConsultantReviewPage.module.css';
import GetStarRating from '../../consultant/video/VideoUser/reviewinput/GetStarRating';
import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import { useState } from "react";
import { useEffect } from "react";


const ConsultantReviewPage = () => {
    const consultantId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.auth.userData);
    const review = useSelector((state) => state.auth.myReviewList);
    const reviewAvg = useSelector((state) => state.auth.reviewAvg);

    const [msg, setMsg] = useState("");

    const reviewMsg = () =>{
      if(reviewAvg>3){
        setMsg("이달의 우수")
      }else{
        setMsg("나쁜사람")
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
                <p>{msg}</p>
                <hr className={classes.hr}/>
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