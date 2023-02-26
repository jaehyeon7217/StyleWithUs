// img
import yellowStar from "../../../../../assets/yellow_star.png";
// css style
import classes from "./GetStarRating.module.css";

const GetStarRating = (props) => {
  const reviewScore = props.reviewScore;

  return (
    <div>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                className={classes["star-type"]}
                type="radio"
                name="rating"
                value={ratingValue}
              />
              <img
                className={`${
                  ratingValue <= reviewScore
                    ? classes["star-yellow"]
                    : classes["star-gray"]
                }`}
                src={yellowStar}
                alt="star"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default GetStarRating;
