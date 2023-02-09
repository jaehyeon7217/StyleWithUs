import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import ButtonBox from "./ButtonBox";
import classes from "../Home/Home.module.css";

import section3Image1 from "../../assets/mainPage/소개팅남.png"
import section3Image2 from "../../assets/mainPage/소개팅녀.png"
import section3Image3 from "../../assets/mainPage/생각말풍선.png"
import section3Image4 from "../../assets/mainPage/엉킨실타래.gif"

import section4Image1 from "../../assets/mainPage/패션캐릭터3.png"
import section4Image2 from "../../assets/mainPage/컨설턴트.png"

import section5Image1 from "../../assets/mainPage/퍼스널컬러자가진단맨상체.png"
import section5Image2 from "../../assets/mainPage/colorcircle.png"
import section5Image3 from "../../assets/mainPage/fall_warm.png"
import section5Image4 from "../../assets/mainPage/spring_warm.png"
import section5Image5 from "../../assets/mainPage/summer_cool.png"
import section5Image6 from "../../assets/mainPage/winter_cool.png"

import section6Image1 from "../../assets/mainPage/퍼스널컬러자가진단맨2상체.png"
import section6Image2 from "../../assets/mainPage/fall_warm.png"
import section6Image3 from "../../assets/mainPage/spring_warm.png"
import section6Image4 from "../../assets/mainPage/summer_cool.png"
import section6Image5 from "../../assets/mainPage/winter_cool.png"

import section7Image1 from "../../assets/mainPage/모자.png"
import section7Image2 from "../../assets/mainPage/보라치마옷.png"
import section7Image3 from "../../assets/mainPage/빨간신발.png"
import section7Image4 from "../../assets/mainPage/핑크상의옷.png"

import section8Image1 from "../../assets/mainPage/소개팅남.png"
import section8Image2 from "../../assets/mainPage/변신남1.png"
import section8Image3 from "../../assets/mainPage/진단서.png"

import section9Image1 from "../../assets/mainPage/지구.png"
import section9Image2 from "../../assets/mainPage/산.png"

import section10Image1 from "../../assets/mainPage/쓰레기더미.png"
import section10Image2 from "../../assets/mainPage/버려지는옷1.png"
import section10Image3 from "../../assets/mainPage/버려지는옷2.png"
import section10Image4 from "../../assets/mainPage/버려지는신발.png"


const Home = () => {
  const [scrollMoveControll, setScrollMoveControll] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const isLogIn = useSelector(state => state.auth.isLogined);

  const lastPageNumber = 11;

  useEffect(() => {
    document.querySelector('#main-page').addEventListener(
      "mousewheel",
      function (event) {
        event.preventDefault();
        if (scrollMoveControll !== event.deltaY) {
          setScrollMoveControll(event.deltaY);
        }
      },
      { passive: false }
    );
  }, [])

  useEffect(() => {
    if (scrollMoveControll !== 0) {
      if (scrollMoveControll >= 100) {
        if (pageNumber + 1 <= lastPageNumber) {
          MoveHandler(pageNumber + 1);
          setPageNumber((prevState) => {
            return prevState + 1;
          });
        }
      } else {
        if (pageNumber - 1 > 1) {
          MoveHandler(pageNumber - 1);
          setPageNumber((prevState) => {
            return prevState - 1;
          });
        } else if (pageNumber - 1 === 1) {
          TopMoveHandler();
        }
      }
    }
  }, [scrollMoveControll]);

  const MoveHandler = (number) => {
    document
      .getElementsByClassName(`${classes["section"+number]}`)[0]
      .scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () {
      setScrollMoveControll(0);
    }, 1000);
  };

  const TopMoveHandler = () => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    setPageNumber(1);
    setTimeout(function () {
      setScrollMoveControll(0);
    }, 1000);
  };

  const ButtonMove = (num) => {
    if (Number(num) === 1) {
      TopMoveHandler();
      setPageNumber(Number(num));
    } else {
      MoveHandler(Number(num));
      setPageNumber(Number(num));
    }
  };

  const LoginHandler = () => {
    navigate('/auth/login')
  };

  const SignUpHandler = () => {
    navigate('/auth/signup')
  };

  return (
    <div id="main-page" className={classes["main-page"]}>
      <ButtonBox pageNumber={pageNumber} buttonMove={ButtonMove} topMoveHandler={TopMoveHandler}/>
      <div className={classes["section1"]}>
        <h1>
          STYLE
          <br />
          WITH
          <br />
          US
        </h1>
        <p className={classes["section1-p1"]}>스타일 추천의 INOVATION</p>
        <p className={classes["section1-p2"]}>스타일 혁신의 가장 확실한 방법</p>
        {isLogIn ? "": <div className={classes.btn}>
          <button onClick={LoginHandler}>
            <span className={classes['button-span']}>로그인</span>
            &nbsp;&nbsp;
            <span className="material-symbols-outlined">login</span>
          </button>
          <button onClick={SignUpHandler}>
            <span className={classes['button-span']}>회원가입</span>
            &nbsp;&nbsp;
            <span className="material-symbols-outlined">person_add</span>
          </button>
        </div>}
      </div>
      <div className={pageNumber !== 2? classes["section2"] : `${classes["section2"]} ${classes.on}`}>
        <p className={pageNumber !== 2? classes["section2-p1"] : `${classes["section2-p1"]} ${classes.on}`}>스타일 추천은</p>
        <p className={pageNumber !== 2? classes["section2-p2"] : `${classes["section2-p2"]} ${classes.on}`}>왜 STYLE WITH US?</p>
      </div>
      <div className={classes["section3"]}>
        <div className={classes.right}>
          <h2 className={pageNumber !== 3? classes["section3-h2"] : `${classes["section3-h2"]} ${classes.on}`}>01</h2>
          <p className={pageNumber !== 3? classes["section3-p1"] : `${classes["section3-p1"]} ${classes.on}`}>스타일 고민은 이제 그만!</p>
          <p className={pageNumber !== 3? classes["section3-p2"] : `${classes["section3-p2"]} ${classes.on}`}>실시간 화상 컨설턴트 상담으로</p>
          <p className={pageNumber !== 3? classes["section3-p3"] : `${classes["section3-p3"]} ${classes.on}`}>맞춤 스타일 추천 서비스</p>
          <p className={pageNumber !== 3? classes["section3-p4"] : `${classes["section3-p4"]} ${classes.on}`}>더 이상 스타일 때문에 소개팅 실패를 걱정할 필요가 없고,<br/>매일 같은 옷을 입는다고 놀림받을 걱정할 필요 없습니다.<br/>STYLE WITH US가  패션 전문가를 통해 맞춤 스타일을 제공합니다.</p>
        </div>
        <div className={pageNumber !== 3? classes["left"] : `${classes["left"]} ${classes.on}`}>
          <img src={section3Image1} alt="소개팅남" />
          <img src={section3Image2} alt="소개팅녀" />
          <div>
            <img src={section3Image4} alt="엉킨실타래" />
            <img src={section3Image3} alt="말풍선" />
          </div>
        </div>
      </div>
      <div className={classes["section4"]}>
        <div className={pageNumber !== 4? classes["right"] : `${classes["right"]} ${classes.on}`}>
          <h2 className={pageNumber !== 4? classes["section4-h1"] : `${classes["section4-h1"]} ${classes.on}`}>회원</h2>
          <p className={pageNumber !== 4? classes["section4-p1"] : `${classes["section4-p1"]} ${classes.on}`}>패션에 관심있는 누구나!</p>
          <img className={pageNumber !== 4? classes["section4-img1"] : `${classes["section4-img1"]} ${classes.on}`} src={section4Image1} alt="회원" />
        </div>
        <div className={pageNumber !== 4? classes["left"] : `${classes["left"]} ${classes.on}`}>
          <h2 className={pageNumber !== 4? classes["section4-h1"] : `${classes["section4-h1"]} ${classes.on}`}>컨설턴트</h2>
          <p className={pageNumber !== 4? classes["section4-p1"] : `${classes["section4-p1"]} ${classes.on}`}>패션 디자인을 전공한 5년 이상의 경력자</p>
          <img className={pageNumber !== 4? classes["section4-img2"] : `${classes["section4-img2"]} ${classes.on}`} src={section4Image2} alt="컨설턴트" />
        </div>
      </div>
      <div className={classes["section5"]}>
        <div className={classes.right}>
          <h2 className={pageNumber !== 5? classes["section5-h2"] : `${classes["section5-h2"]} ${classes.on}`}>02</h2>
          <p className={pageNumber !== 5? classes["section5-p1"] : `${classes["section5-p1"]} ${classes.on}`}>전문가에게 받는 것처럼!</p>
          <p className={pageNumber !== 5? classes["section5-p2"] : `${classes["section5-p2"]} ${classes.on}`}>똑똑한 퍼스널 컬러 자가 진단</p>
          <p className={pageNumber !== 5? classes["section5-p3"] : `${classes["section5-p3"]} ${classes.on}`}>실제 전문가에게 받는 것처럼<br/>퍼스널 컬러 자가 진단 서비스를 제공해<br/>사용자 의류 색상 진단에 도움을 드려 똑똑한 의사결정이 가능합니다.</p>
          <img className={pageNumber !== 5? classes["section5-img"] : `${classes["section5-img"]} ${classes.on}`} src={section5Image2} alt="colorCircle" />
        </div>
        <div className={pageNumber !== 5? classes["left"] : `${classes["left"]} ${classes.on}`}>
          <img src={section5Image1} alt="퍼스널컬러자가진단" />
          <img src={section5Image3} alt="fall_warm" />
          <img src={section5Image4} alt="spring_warm" />
          <img src={section5Image5} alt="summer_cool" />
          <img src={section5Image6} alt="winter_cool" />
        </div>
      </div>
      <div className={pageNumber !== 6? classes["section6"] : `${classes["section6"]} ${classes.on}`}>
        <p className={pageNumber !== 6? classes["section6-p1"] : `${classes["section6-p1"]} ${classes.on}`}>자가 퍼스널 컬러 진단 서비스 제공!</p>
        <p className={pageNumber !== 6? classes["section6-p2"] : `${classes["section6-p2"]} ${classes.on}`}>봄/가을 웜톤부터 여름/겨울 쿨톤까지 무료로 진단하세요</p>
        <div>
          <img src={section6Image1} alt="퍼스널컬러자가진단2" />
          <img src={section6Image2} alt="퍼스널컬러자가진단3" />
          <img src={section6Image3} alt="퍼스널컬러자가진단4" />
          <img src={section6Image4} alt="퍼스널컬러자가진단5" />
          <img src={section6Image5} alt="퍼스널컬러자가진단6" />
        </div>
      </div>
      <div className={classes["section7"]}>
        <div className={classes.right}>
          <h2 className={pageNumber !== 7? classes["section7-h2"] : `${classes["section7-h2"]} ${classes.on}`}>03</h2>
          <p className={pageNumber !== 7? classes["section7-p1"] : `${classes["section7-p1"]} ${classes.on}`}>다양한 체형 검사를 통한</p>
          <p className={pageNumber !== 7? classes["section7-p2"] : `${classes["section7-p2"]} ${classes.on}`}>의류 추천 서비스</p>
          <p className={pageNumber !== 7? classes["section7-p3"] : `${classes["section7-p3"]} ${classes.on}`}>사용자의 나이, 성별, 체형, 발 사이즈 등<br/>간단하지만 다양한 검사를 통해<br/>사용자에게 적합한 의류 추천 서비스를 제공</p>
        </div>
        <div className={pageNumber !== 7? classes["left"] : `${classes["left"]} ${classes.on}`}>
          <img src={section7Image1} alt="모자"/>
          <img src={section7Image2} alt="보라치마옷"/>
          <img src={section7Image3} alt="빨간신발"/>
          <img src={section7Image4} alt="핑크상의옷"/>
        </div>
      </div>
      <div className={pageNumber !== 8? classes["section8"] : `${classes["section8"]} ${classes.on}`}>
        <p className={pageNumber !== 8? classes["section8-p1"] : `${classes["section8-p1"]} ${classes.on}`}>진단 시간까지 단 5분!</p>
        <p className={pageNumber !== 8? classes["section8-p2"] : `${classes["section8-p2"]} ${classes.on}`}>당신의 스타일을 추천해 드려요</p>
        <p className={pageNumber !== 8? classes["section8-p3"] : `${classes["section8-p3"]} ${classes.on}`}>나이와 성별 체형만 입력하면 스타일 고민은 끝</p>
        <div className={classes.bottom}>
          <img src={section8Image1} alt="소개팅남" />
          <div className={classes.loading1}><span></span><span></span><span></span></div>
          <img src={section8Image3} alt="진단서" />
          <div className={classes.loading2}><span></span><span></span><span></span></div>
          <img src={section8Image2} alt="변신남" />
        </div>
      </div>
      <div className={classes["section9"]}>
        <div className={classes.right}>
          <h2 className={pageNumber !== 9? classes["section9-h2"] : `${classes["section9-h2"]} ${classes.on}`}>04</h2>
          <p className={pageNumber !== 9? classes["section9-p1"] : `${classes["section9-p1"]} ${classes.on}`}>패스트패션으로 인한</p>
          <p className={pageNumber !== 9? classes["section9-p2"] : `${classes["section9-p2"]} ${classes.on}`}>환경 오염 해소에 동참하는 친환경 사이트</p>
          <p className={pageNumber !== 9? classes["section9-p3"] : `${classes["section9-p3"]} ${classes.on}`}>STYLE WITH US는<br/>사용자에게 적합한 의류를 추천해 줌으로써 의류 낭비를 막고<br/>모든 수익금을 패스트패션으로 인한 환경 오염 해결에 기부합니다.</p>
        </div>
        <div className={pageNumber !== 9? classes["left"] : `${classes["left"]} ${classes.on}`}>
          <img src={section9Image1} alt="지구" />
          <img src={section9Image2} alt="산" />
        </div>
      </div>
      <div className={pageNumber !== 10? classes["section10"] : `${classes["section10"]} ${classes.on}`}>
        <p className={pageNumber !== 10? classes["section10-p1"] : `${classes["section10-p1"]} ${classes.on}`}>한 해 버려지는 옷들만 무려 330억 벌!</p>
        <p className={pageNumber !== 10? classes["section10-p2"] : `${classes["section10-p2"]} ${classes.on}`}>의류에서 발생하는 온실가스 배출량은 전 세계 탄소 배출량의 10%</p>
        <p className={pageNumber !== 10? classes["section10-p3"] : `${classes["section10-p3"]} ${classes.on}`}>-KBS ‘환경 스폐셜 옷을 위한 지구는 없다’</p>
        <div className={classes.bottom}>
          <img src={section10Image1} alt="쓰레기더미" />
          <img src={section10Image2} alt="버려지는옷" />
          <img src={section10Image3} alt="버려지는옷2" />
          <img src={section10Image4} alt="버려지는옷3" />
        </div>
      </div>
      <div className={pageNumber !== 11? classes["section11"] : `${classes["section11"]} ${classes.on}`}>
        <p className={pageNumber !== 11? classes["section11-p1"] : `${classes["section11-p1"]} ${classes.on}`}>STYLE WITH US를 통해</p>
        <p className={pageNumber !== 11? classes["section11-p2"] : `${classes["section11-p2"]} ${classes.on}`}>나에게 적합한 옷을 찾아 오래오래 입자!</p>
      </div>
    
      
      <button className={classes.top} onClick={TopMoveHandler}>
        <span>처음으로</span>&nbsp;<span className="material-symbols-outlined">vertical_align_top</span>
      </button>
    </div>
  );
};

export default Home;
