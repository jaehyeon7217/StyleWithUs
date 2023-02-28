import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// img
import gif from "../../assets/styleWithUsGif.gif";
import signupimg from "../../assets/mainPage/회원가입아이콘.png";
import loginimg from "../../assets/mainPage/로그인아이콘.png";
import main1 from "../../assets/usePage/main1.png";
import main2 from "../../assets/usePage/main2.png";
import login from "../../assets/usePage/login.png";
import consultant from "../../assets/usePage/consultant.png";
import sbti from "../../assets/usePage/sbti.png";
import recommend from "../../assets/usePage/recommend.png";
import wish from "../../assets/usePage/wish.png";
import mypage from "../../assets/usePage/mypage.png";
import colorcircle from "../../assets/colorcircle.png";
import personalcolor from "../../assets/usePage/personalcolor.png";
// css style
import classes from "./UseStyleWithUs.module.css";

const UseStyleWithUs = () => {
  const navigate = useNavigate();

  // 메인페이지 이동
  const toMainPage = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // 회원가입 페이지
  const toSignup = (event) => {
    event.preventDefault();
    navigate("/auth/signup");
  };
  // 로그인 페이지 이동
  const toLogin = (event) => {
    event.preventDefault();
    navigate("/auth/login");
  };

  useEffect(() => {
    document
      .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <div className={classes.pagebox}>
        <div className={classes.page}>
          <div>
            <p className={classes.smallName}>HOW TO USE STYLE WITH US</p>
            <h1 className={classes.bigName}>서비스 이용 방법</h1>
          </div>
          <div className={classes.contentbox}>
            <div>
              <img src={main1} alt="" className={classes.main1} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>STEP2</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>메인 페이지 즐기기</p>
                <p className={classes.datacontenttwo}>
                  스타일 윗 어스의 다양한 기능이 담긴{" "}
                </p>
                <p className={classes.datacontenttwo}>
                  메인 페이지를 즐기며 서비스 익히기{" "}
                </p>
              </div>
              <img src={login} alt="" className={classes.login} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>STEP4</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>컨설턴트 화상 상담 진행</p>
                <p className={classes.datacontenttwo}>
                  패션 전문 컨설턴트와 실시간 화상 채팅으로{" "}
                </p>
                <p className={classes.datacontenttwo}>
                  체형/퍼스널컬러/스타일 진단 받고
                </p>
                <p className={classes.datacontenttwo}>
                  나에게 적합한 스타일 추천 받기{" "}
                </p>
              </div>
              <img src={sbti} alt="" className={classes.sbti} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>STEP6</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>스타일 추천 받기</p>
                <p className={classes.datacontenttwo}>
                  SBTI 진단 내용을 바탕으로{" "}
                </p>
                <p className={classes.datacontenttwo}>
                  나에게 적합한 스타일 추천 받고
                </p>
                <p className={classes.datacontenttwo}>
                  마음에 드는 옷 장바구니에 담기
                </p>
              </div>
              <img src={wish} alt="" className={classes.wish} />
              <div className={classes.diaryboxtwo}>
                <div className={classes.dateboxtwo}>
                  <p className={classes.datetwo}>STEP8</p>
                  <p className={classes.dash}>-</p>
                </div>
                <p className={classes.datenametwo}>퍼스널컬러 진단받기</p>
                <p className={classes.datacontenttwo}>
                  자신의 얼굴 사진을 등록해
                </p>
                <p className={classes.datacontenttwo}>
                  봄/가을 웜톤 여름/겨울 쿨톤 진단받고
                </p>
                <p className={classes.datacontenttwo}>
                  어울리는 컬러/립스틱/헤어/스타일 추천 받기
                </p>
              </div>
              <img src={mypage} alt="" className={classes.realmypage} />
            </div>
            <div className={classes.vLine}></div>
            <div>
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>STEP1</p>
                </div>
                <p className={classes.datenameone}>
                  스타일 윗 어스 사이트 접속하기
                </p>
                <p className={classes.datacontent}>
                  화상 회의 기반의 패션 추천 사이트
                </p>
                <p className={classes.datacontent}>
                  스타일 윗 어스 메인 페이지 접속하기
                </p>
              </div>
              <img src={main2} alt="" className={classes.main2} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>STEP3</p>
                </div>
                <p className={classes.datenameone}>회원가입/로그인</p>
                <p className={classes.datacontent}>
                  가입 유형 컨설턴트/일반 유저에 따라{" "}
                </p>
                <p className={classes.datacontent}>회원가입 및 로그인하기</p>
              </div>
              <img src={consultant} alt="" className={classes.consultant} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>STEP5</p>
                </div>
                <p className={classes.datenameone}>SBTI 진단 받기</p>
                <p className={classes.datacontent}>
                  키/어깨/팔길이 등 자신의 체형을 입력 하고
                </p>
                <p className={classes.datacontent}>
                  나에게 적합한 스타일 추천받기
                </p>
              </div>
              <img src={recommend} alt="" className={classes.recommend} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>STEP7</p>
                </div>
                <p className={classes.datenameone}>구매/삭제하러 가기</p>
                <p className={classes.datacontent}>
                  스타일 윗 어스를 이용하며 관심 상품에 담은{" "}
                </p>
                <p className={classes.datacontent}>
                  의류 스타일을 구매/삭제하러 가기{" "}
                </p>
              </div>
              <img src={personalcolor} alt="" className={classes.mypage} />
              <div className={classes.diaryboxone}>
                <div className={classes.dateboxone}>
                  <p className={classes.dash}>-</p>
                  <p className={classes.dateone}>STEP9</p>
                </div>
                <p className={classes.datenameone}>마이페이지 활용하기</p>
                <p className={classes.datacontent}>
                  쇼핑 정보/내 정보/자주 묻는 질문 등이
                </p>
                <p className={classes.datacontent}>
                  나의 정보가 모아져있는 마이페이지 활용하기
                </p>
              </div>
            </div>
          </div>
          <div className={classes.marginbox}></div>
          <div className={classes.gifbox}>
            <img src={gif} alt="" className={classes.gif} />
            <div>
              <h2 className={classes.gifTitle}>스타일 윗 어스 시작하기</h2>
              <div className={classes.gifp} onClick={toMainPage}>
                <img src={colorcircle} alt="" className={classes.colorcircle} />
                <p className={classes.giftext}>메인 페이지 즐기기</p>
              </div>
              <div className={classes.gifp} onClick={toSignup}>
                <img src={signupimg} alt="" className={classes.colorcircle} />
                <p className={classes.giftext}>회원가입하러 가기</p>
              </div>
              <div className={classes.gifp} onClick={toLogin}>
                <img src={loginimg} alt="" className={classes.loginimg} />
                <p className={classes.giftext}>로그인하러 가기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseStyleWithUs;
