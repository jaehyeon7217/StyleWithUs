import {useSelector } from "react-redux";
import classes from './ConsultantReviewPage.module.css';
import GetStarRating from '../../consultant/video/VideoUser/reviewinput/GetStarRating';
import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';


const ConsultantReviewPage = () => {
    const consultantId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.auth.userData);
    const review = useSelector((state) => state.auth.myReviewList);

    return(
        <div className={classes.ReviewPage}>
            <ConsultantMyPageSideBar />
            <div className={classes.ReviewMainBox}>
                <h3 className={classes.MyReviewName}>나의 리뷰</h3>
                <hr className={classes.hr}/>
                {review.map((item, idx) => {
                    return (
                        <div key={idx} className={classes.ReviewBox}>
                            <div className={classes.ReviewOne}>
                                <GetStarRating reviewScore={review[idx].reviewScore} className={classes.star} />
                                <p className={classes.reviewScore}>{review[idx].reviewScore}</p>
                                <p className={classes.userId}>{review[idx].userId}</p>
                            </div>
                            <p className={classes.reviewContent}>{review[idx].reviewContent}</p>
                            <div className={classes.borderbottom}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ConsultantReviewPage;