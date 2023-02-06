import { useState, Fragment } from "react";
import classes from "./RecommendItemBox.module.css";

import RecommendItem from "./RecommendItem";

const RecommendItemBox = (props) => {
  const [showBtn, setShowBtn] = useState(1);

  // title, image, price, url
  const clothesData = [
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACKzzzzzzzzzzzzzzz",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
    {
      title: "[패키지] 올카 오버핏 스웨트셔츠 9종 2PACK",
      image: "https://image.msscdn.net/images/goods_img/20230126/3039449/3039449_16746957717012_500.jpg",
      price: "44,900원",
      maker: "JEMUT",
      url: "https://www.musinsa.com/app/goods/3039449?loc=goods_rank",
    },
    {
      title: "[기모선택] 와이드 절개 벌룬팬츠 코튼 카키",
      image: "https://image.msscdn.net/images/goods_img/20210812/2060759/2060759_5_500.jpg",
      price: "59,800원",
      maker: "GLW",
      url: "https://www.musinsa.com/app/goods/2060759",
    },
    {
      title: "[무봉제]덕다운 심리스 미니멀 푸퍼 숏패딩_Black",
      image: "https://image.msscdn.net/images/goods_img/20191001/1173366/1173366_10_500.jpg",
      price: "69,900원",
      maker: "LAFUDGESTORE",
      url: "https://www.musinsa.com/app/goods/1173366",
    },
  ];

  const onClickHandler = () => {
    
  };

  return (
    <Fragment>
      <div className={classes.box}>
        <h3 className={classes.h3}>{props.type}</h3>
        <div className={classes['clothes-items']}>
          {clothesData.map(data => {
            return <RecommendItem data={data}/>
          })}
        </div>
        <div className={classes['button-box']}>
          <button onClick={onClickHandler}>더보기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RecommendItemBox;
