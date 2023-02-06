const ConsultantReviewsList = (props) => {
  const reviewScore = props.reviewScore;
  const reviewContent = props.reviewContent;

  return (
    <div>
      <div>{reviewScore}</div>
      <div>{reviewContent}</div>
    </div>
  );
};

export default ConsultantReviewsList;
