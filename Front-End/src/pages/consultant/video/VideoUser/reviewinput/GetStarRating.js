import yellowStar from "../../../../../assets/yellow_star.png";
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
              {/* <FaStar
                className={classes.star}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={25}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              /> */}
            </label>
          ); ///
        })}
      </div>
    </div>
  );
};

export default GetStarRating;
