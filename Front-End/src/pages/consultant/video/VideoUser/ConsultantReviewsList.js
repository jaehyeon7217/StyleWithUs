import { useSelector } from "react-redux";
import axios from 'axios';
import GetStarRating from "./reviewinput/GetStarRating";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviewsList = (props) => {
  // token
  const token = useSelector((state) => state.auth.token)

  const reviewUserId = props.reviewuserId;
  const reviewNo = props.reviewNo;
  const reviewScore = Math.round(props.reviewScore);
  const reviewContent = props.reviewContent;
  const deleteAllowed = props.deleteAllowed;

  const deleteReviewHandler = async () => {
    await deleteReview(reviewNo);
  }

  const deleteReview = async (reviewNo) => {
    const url = APPLICATION_SERVER_URL + "review/delete/" + reviewNo;
    const response = await axios.delete(
      url,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log(response.data);
    props.setIsDeleted(!props.isDeleted);
    return response.data;
  };

  return (
    <div>
      <div>{reviewScore}</div>
      <GetStarRating reviewScore={reviewScore}/>
      <div>{reviewContent}</div>
      {deleteAllowed && <input type="button" value="삭제" onClick={deleteReviewHandler} />}
      <br />
    </div>
  );
};

export default ConsultantReviewsList;
