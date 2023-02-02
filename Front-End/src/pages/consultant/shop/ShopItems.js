import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shopActions } from "../../../store/shop";
import axios from "axios";

import ShopItem from "./ShopItem";
import Pagination from "../component/Pagination";
import classes from "./ShopItems.module.css";
import codeNumber from "./CodeNumber";

const ShopItems = (props) => {
  const [pagination, setPagination] = useState(1);
  const [divPagination, setDivPageNation] = useState(1);

  const type = props.detailPage.type;
  const detail = props.detailPage.detail;

  const dispatch = useDispatch();

  useEffect(() => {
    const url = `https://i8d105.p.ssafy.io/be/data/${codeNumber[type][detail]}`;

    axios
    .get(url)
      .then((response) => {
        const payload = {type, detail, data: response.data.data}
        dispatch(shopActions.downloadData(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 리덕스에서 옷 정보를 가져온다.
  const items = useSelector((state) => state.shop.category);

  // 페이지에 출력될 옷 개수
  const clothesCount = 5;

  // 페이지 마지막 번호
  const lastPageNumber = Math.floor(items[type][detail].length / clothesCount);

  // 페이지 번호를 담은 배열
  let pageArray = new Array();
  for (let i = 0; i < lastPageNumber; i++) {
    pageArray.push(i + 1);
  }

  // 페이지네이션의 마지막 번호
  const lastDivPageNumber = Math.ceil(lastPageNumber / 5);

  // 페이지 버튼을 클릭시 pagination을 업로드 하는 함수
  const onClickHandler = (num) => {
    setPagination(num);
  };

  // 페이지네이션을 뒤로 가게 하는 버튼
  const prevPagination = () => {
    if (divPagination > 1) {
      setDivPageNation((prevState) => {
        return prevState - 1;
      });
    }
  };

  const nextPagination = () => {
    if (divPagination < lastDivPageNumber) {
      setDivPageNation((prevState) => {
        return prevState + 1;
      });
    }
  };

  const shopOffHandler = () => {
    props.detailShopOff();
  };

  return (
    <Fragment>
      <h3 className={classes.h3}>{detail}<span onClick={shopOffHandler} className={classes.button}>항목으로 돌아가기</span></h3>
      <ul className={classes.ul}>
        {items[type][detail].map((item, idx) => {
          return clothesCount * (pagination - 1) <= idx &&
            clothesCount * (pagination - 1) + clothesCount > idx ? (
            <li key={idx} className={classes.li}>
              <ShopItem item={item} />
            </li>
          ) : (
            ""
          );
        })}
      </ul>
      <div className={classes.pagination}>
        <span onClick={prevPagination} className={`material-symbols-outlined ${classes.prev} ${divPagination === 1 ? classes.eventDefault : ''}`}>
          arrow_back_ios_new
        </span>
        <div className={`${classes.bindNumber} ${divPagination === lastDivPageNumber ? classes.lastPagination : ""}`}>
          {pageArray.map((pageNumber, idx) => {
            return 5 * (divPagination - 1) <= idx &&
              5 * (divPagination - 1) + 5 > idx ? (
              <Pagination
                key={`page-${pageNumber}`}
                pageNumber={pageNumber}
                onClickHandler={onClickHandler}
                pageOn={pagination === idx + 1? true : false}
              />
            ) : (
              ""
            );
          })}
        </div>
        <span id="next" onClick={nextPagination} className={`material-symbols-outlined ${classes.next} ${divPagination === lastDivPageNumber ? classes.eventDefault : ''}`}>arrow_forward_ios</span>
      </div>
    </Fragment>
  );
};

export default ShopItems;
