import { useState, useEffect } from "react";

import classes from "./LengthType.module.css";

const LengthType = (props) => {
  const data = props.data;
  const [count, setCount] = useState(0); 

  useEffect(() => {
    let timer = null;

    if (count < data) {
      timer = setInterval(() => {
        setCount((prevState) => {
          return prevState + 1;
        });
      }, props.timer);
    }

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>{props.type}&nbsp;<span id={`${props.type}`}>{count}</span></div>
  );
};

export default LengthType;