import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  return (
    <div>
      <div>
        {[...Array(5)].map((star) => {
          return (
            <label>
              <input type="radio" name="rating" />
              <FaStar size={25} />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
