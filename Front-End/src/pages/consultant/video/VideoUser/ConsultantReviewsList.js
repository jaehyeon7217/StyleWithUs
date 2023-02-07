import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviewsList = (props) => {
  // token
  const token = useSelector((state) => state.auth.token)
  const userId = useSelector((state) => state.auth.userData.userId);

  const reviewUserId = props.userId;
  const reviewNo = props.reviewNo;
  const reviewScore = props.reviewScore;
  const reviewContent = props.reviewContent;

  // 작성한 아이디와 로그인한 아이디가 같은 경우 삭제 버튼 보이게
  const [checkUserId, setCheckUserId] = useState(false);

  useEffect(() => {
    if (userId === reviewUserId) {
      setCheckUserId(true);
    }
  }, []);

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
      <div>{reviewContent}</div>
      {checkUserId && <input type="button" value="삭제" onClick={deleteReviewHandler} />}
      <br />
    </div>
  );
};

export default ConsultantReviewsList;
