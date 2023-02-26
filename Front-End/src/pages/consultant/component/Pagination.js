// css style
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const onClickHandler = () => {
    props.onClickHandler(props.pageNumber);
  };

  return (
    <span
      className={`${classes.pageNumber} ${props.pageOn ? classes.on : ""}`}
      onClick={onClickHandler}
    >
      {props.pageNumber}
    </span>
  );
};

export default Pagination;
