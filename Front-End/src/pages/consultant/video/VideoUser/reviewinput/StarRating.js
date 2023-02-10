import React, { useState } from "react";
import classes from "./StarRating.module.css";
import yellowStar from "../../../../../assets/yellow_star.png";

const StarRating = (props) => {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(null);

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
                onClick={() => {
                  setRating(ratingValue);
                  props.onReviewScore(ratingValue);
                }}
              />
              <img
                className={`${
                  ratingValue <= (hover || rating)
                    ? classes["star-yellow"]
                    : classes["star-gray"]
                }`}
                src={yellowStar}
                alt="star"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                size={25}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
