const Pagination = (props) => {
  const onClickHandler = () => {
    props.onClickHandler(props.pageNumber);
  };

  return (
    <span onClick={onClickHandler}>{props.pageNumber}</span>
  );
};

export default Pagination;