import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ConsultantReviewsList from "./ConsultantReviewsList";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviews = (props) => {
  // token
  const token = useSelector((state) => state.auth.token);

  const [reviewLists, setReviewLists] = useState([]);
  const [avgScore, setAvgScore] = useState(undefined);
  const consultantId = props.consultantId;

  useEffect(() => {
    getReviews(consultantId);
  }, []);

  const getReviews = async (consultantId) => {
    const url = APPLICATION_SERVER_URL + "review/show/" + consultantId;
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    // console.log(response.data);
    setReviewLists(response.data.data);
    setAvgScore(response.data.avgScore);
  };

  return (
    <div>
      <h1>ConsultantReviews</h1>
      <div>평균 평점: {avgScore}</div>
      {reviewLists.map((list, idx) => {
        return (
          <ConsultantReviewsList
            key={idx}
            reviewScore={list.reviewScore}
            reviewContent={list.reviewContent}
          />
        );
      })}
    </div>
  );
};

export default ConsultantReviews;
