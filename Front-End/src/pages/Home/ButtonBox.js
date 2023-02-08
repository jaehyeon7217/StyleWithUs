import classes from "./ButtonBox.module.css";

const ButtonBox = (props) => {
  const pageNumber = props.pageNumber

  const onClickHandler = (event) => {
    if (event.target.dataset.number === 1) {
      props.topMoveHandler();
    } else {
      props.buttonMove(event.target.dataset.number);
    }
  };

  return (
    <div className={classes['button-box']}>
      <div className={pageNumber === 1 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={1}></div>
      <div className={pageNumber === 2 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={2}></div>
      <div className={pageNumber === 3 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={3}></div>
      <div className={pageNumber === 4 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={4}></div>
      <div className={pageNumber === 5 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={5}></div>
      <div className={pageNumber === 6 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={6}></div>
      <div className={pageNumber === 7 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={7}></div>
      <div className={pageNumber === 8 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={8}></div>
      <div className={pageNumber === 9 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={9}></div>
      <div className={pageNumber === 10 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={10}></div>
      <div className={pageNumber === 11 ? `${classes.button} ${classes.on}` : classes.button} onClick={onClickHandler} data-number={11}></div>
    </div>
  );
};

export default ButtonBox;