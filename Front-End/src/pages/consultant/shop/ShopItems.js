import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import ShopItem from "./ShopItem";
import Pagination from "../component/Pagination";
import classes from "./ShopItems.module.css";

const ShopItems = (props) => {
  const [pagination, setPagination] = useState(1);
  const [divPagination, setDivPageNation] = useState(1);

  const type = props.detailPage.type;
  const detail = props.detailPage.detail;

  // 리덕스에서 옷 정보를 가져온다.
  const items = useSelector(state => state.shop.category)

  // 페이지 마지막 번호
  const lastPageNumber = Math.floor(items[type][detail].length / 10);

  // 페이지 번호를 담은 배열
  let pageArray = new Array();
  for (let i = 0; i < lastPageNumber; i++) {
    pageArray.push(i + 1);
  };

  // 페이지네이션의 마지막 번호
  const lastDivPageNumber = Math.ceil(lastPageNumber / 5);

  // 페이지 버튼을 클릭시 pagination을 업로드 하는 함수
  const onClickHandler = (num) => {    
    setPagination(num);
  }

  // 페이지네이션을 뒤로 가게 하는 버튼
  const prevPagination = () => {
    if (divPagination > 1) {
      setDivPageNation((prevState) => {
        return prevState - 1;
      })
    }
  };

  const nextPagination = () => {
    if (divPagination < lastDivPageNumber) {
      setDivPageNation((prevState) => {
        return prevState + 1;
      })
    }
  };

  return (
    <Fragment>
      <h3>{detail}</h3>
      <ul>
        {items[type][detail].map((item, idx) => {
          return (10 * (pagination - 1)) <= idx && (10 * (pagination - 1)) + 10 > idx ? <li key={idx}><ShopItem item={item}/></li> : "";
        })}
      </ul>
      <div>
        <span onClick={prevPagination}>prev</span>
        {pageArray.map((pageNumber, idx) => {
          return (5 * (divPagination - 1)) <= idx && (5 * (divPagination - 1)) + 5 > idx ? <Pagination key={`page-${pageNumber}`} pageNumber={pageNumber} onClickHandler={onClickHandler}/> : ""; 
        })}
        <span onClick={nextPagination}>next</span>
      </div>
    </Fragment>
  );
};

export default ShopItems;