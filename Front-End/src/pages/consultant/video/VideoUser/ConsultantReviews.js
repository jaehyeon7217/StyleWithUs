import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ConsultantReviewsList from "./ConsultantReviewsList";
import GetStarRating from "./reviewinput/GetStarRating";
import classes from './ConsultantReviews.module.css';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviews = (props) => {
  // token
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userData.userId);

  const [reviewLists, setReviewLists] = useState([]);
  const [avgScore, setAvgScore] = useState(undefined);
  const consultantId = props.consultantId;

  useEffect(() => {
    getReviews(consultantId);
  }, []);

  const getReviews = async (consultantId) => {
    const url = APPLICATION_SERVER_URL + "review/show/consultant/" + consultantId;
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    // console.log(response.data);
    setReviewLists(response.data.data);
    setAvgScore(response.data.avgScore);
  };

  // 리뷰 삭제한 경우 처리
  const [isDeleted, setIsDeleted] = useState(undefined)
  useEffect(() => {
    getReviews(consultantId);
  }, [isDeleted])

  return (
    <div>
      <div className={classes["reviews-title"]}>ConsultantReviews</div>
      <div className={classes["reviews-avg-score"]}>평균 평점: {avgScore}<GetStarRating reviewScore={Math.round(avgScore)}/></div>
      {reviewLists.map((list, idx) => {
        return (
          <ConsultantReviewsList
            key={idx}
            reviewUserId={list.userId}
            reviewNo={list.reviewNo}
            reviewScore={list.reviewScore}
            reviewContent={list.reviewContent}
            deleteAllowed={(userId === list.userId) ? true : false}
            isDeleted={isDeleted}
            setIsDeleted={setIsDeleted}
          />
        );
      })}
    </div>
  );
};

export default ConsultantReviews;
