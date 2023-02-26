import { useSelector } from "react-redux";
import axios from "axios";
// component
import GetStarRating from "./reviewinput/GetStarRating";
// css style
import classes from "./ConsultantReviewsList.module.css";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviewsList = (props) => {
  // token
  const token = useSelector((state) => state.auth.token);

  const reviewUserId = props.reviewUserId;
  const reviewNo = props.reviewNo;
  const reviewScore = Math.round(props.reviewScore);
  const reviewContent = props.reviewContent;
  const deleteAllowed = props.deleteAllowed;

  const deleteReviewHandler = async () => {
    await deleteReview(reviewNo);
  };

  const deleteReview = async (reviewNo) => {
    const url = APPLICATION_SERVER_URL + "review/delete/" + reviewNo;
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });
    props.setIsDeleted(!props.isDeleted);
    return response.data;
  };

  return (
    <div className={classes.review}>
      <div className={classes["review-content-box"]}>
        <div className={classes["review-writer"]}>
          {reviewUserId}
          {deleteAllowed && (
            <input
              type="button"
              value="삭제"
              className={classes.button}
              onClick={deleteReviewHandler}
            />
          )}
        </div>
        <GetStarRating reviewScore={reviewScore} />
        <div className={classes["review-content"]}>{reviewContent}</div>
      </div>
    </div>
  );
};

export default ConsultantReviewsList;
