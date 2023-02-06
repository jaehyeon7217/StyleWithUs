import { useState } from "react";
import axios from "axios";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i8d105.p.ssafy.io/be/";

const ConsultantReviews = (props) => {
  const url = APPLICATION_SERVER_URL + "review/write";

  const [review, setReview] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.setBackIsClicked(false);
    // axios POST
  };

  return (
    <div>
      <form action="" onSubmit={onSubmitHandler}>
        <h1>컨설턴트 리뷰</h1>
        <div>
          <p>컨설턴트 점수</p>
          <input
            type="number"
            id="reviewScore"
            min="0.5"
            max="5.0"
            step="0.1"
          />
        </div>
        <div>
          <p>후기</p>
          <textarea name="" id="" cols="30" rows="10" placeholder="리뷰를 작성해주세요" onChange={setReview}>{review}</textarea>
        </div>
        <input type="button" value="리뷰 작성하기" />
      </form>
    </div>
  );
};

export default ConsultantReviews;
