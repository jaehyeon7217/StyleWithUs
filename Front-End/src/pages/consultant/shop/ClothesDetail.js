import classes from "./ClothesDetail.module.css";

const ClothesItems = (props) => {
  const onClickHandler = () => {
    props.detailShop(props.detail);
  };

  return (
    <p className={classes.p} onClick={onClickHandler}>{props.detail}</p>
  );
};

export default ClothesItems;