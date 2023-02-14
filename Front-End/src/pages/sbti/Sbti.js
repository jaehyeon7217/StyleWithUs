import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

import man from "../../assets/mainPage/컨설턴트.png"
import woman from "../../assets/mainPage/패션캐릭터4.png"
import left2 from "../../assets/왼쪽.png"
import right2 from "../../assets/오른쪽.png"

import classes from "./Sbti.module.css";

import Radio from './radiocomponent/Radio';


const totalSlide = 4;
const Sbti = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [height, setHeight] = useState(userData.userHeight);
  const [foot, setFoot] = useState(userData.userFoot);
  // 상체 정보
  const [shoulder, setShoulder] = useState(userData.userShoulder);
  const [chest, setChest] = useState(userData.userChest);
  const [sleeve, setSleeve] = useState(userData.userSleeve);
  // 하체 정보
  const [waist, setWaist] = useState(userData.userWaist);
  const [hip, setHip] = useState(userData.userHip);
  const [thigh, setThigh] = useState(userData.userThigh);
  const [hem, setHem] = useState(userData.userHem);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  

  const userGender = useSelector((state) => state.auth.userData.userGender);

  const shoulderSize = userGender ? [52, 55, 56, 58] : [55, 58, 61, 63]
  const chesteSize = userGender ? [56, 59, 61, 63] : [59, 62, 65, 68]
  const sleeveSize = userGender ? [56, 58, 60, 61] : [57, 59, 60, 62]

  const waistSize = userGender ? [33, 34, 36, 39] : [35, 37, 39, 41]
  const hipSize = userGender ? [57, 59, 61, 63] : [55, 57, 59, 62]
  const thighSize = userGender ? [31, 33, 34, 35] : [33, 34, 36, 37]
  const hemSize = userGender ? [22, 23, 24, 25] : [25, 26, 27, 28]

  const classList = ['first', 'second', 'third', 'fourth']

  const location = useLocation();
  const [isSBTI, setIsSBTI] = useState(false);


  useEffect(()=>{
    if(location.pathname==='/sbti'){
      setIsSBTI(true)
    }else{
      setIsSBTI(false)
    }
  })


  const nextSlide = () => {
    if (currentSlide >= totalSlide) {
      // 더 이상 넘어갈 슬라이드가 없으면 스탑.
      setCurrentSlide(currentSlide);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      // 더 이상 뒤로 갈 슬라이드가 없으면 스탑
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    // 백틱을 사용하여 슬라이드로 이동하는 애니메이션 구현.
  }, [currentSlide]);

  const stringToInt = (data) => {
    const ans = parseInt(data, 10);
    return ans;
  };

  const submitSbti = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/user/update";
    axios
      .put(
        url,
        {
          userId: userData.userId,
          userName: userData.userName,
          userNickname: userData.userNickname,
          userEmail: userData.userEmail,
          userGender: userData.userGender,
          userHeight: stringToInt(height),
          userFoot: stringToInt(foot),
          userShoulder: stringToInt(shoulder),
          userChest: stringToInt(chest),
          userSleeve: stringToInt(sleeve),
          userWaist: stringToInt(waist),
          userHip: stringToInt(hip),
          userThigh: stringToInt(thigh),
          userHem: stringToInt(hem),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        dispatch(authActions.newSBTi(response.data))
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 첫번째

  // 두번째
  const sSlideRef = useRef(null);
  const [secondQuestion, setSecond] = useState(0);

  const secondFirstQuestion = () =>{
    setSecond(0)
    document.getElementById("shoulder").style.opacity = 1;
    document.getElementById("chest").style.opacity = 0.3;
    document.getElementById("sleeve").style.opacity = 0.3;
  };
  const secondSecondQuestion = () =>{
    setSecond(1)
    document.getElementById("shoulder").style.opacity = 0.3;
    document.getElementById("chest").style.opacity = 1;
    document.getElementById("sleeve").style.opacity = 0.3;
  }
  const secondThirdQuestion = () =>{
    setSecond(2)
    document.getElementById("shoulder").style.opacity = 0;
    document.getElementById("chest").style.opacity = 0.3;
    document.getElementById("sleeve").style.opacity = 1;
  }
  useEffect(() => {
    if(secondQuestion===0){
      document.getElementById("shoulder").style.opacity = 1;
      document.getElementById("chest").style.opacity = 0.3;
      document.getElementById("sleeve").style.opacity = 0.3;
    }
    sSlideRef.current.style.transition = "all 0.5s ease-in-out";
    sSlideRef.current.style.transform = `translateY(-${secondQuestion * 70}px)`;
  }, [secondQuestion]);

  // 세번째

  const tSlideRef = useRef(null);
  const [thirdQuestion, setThird] = useState(0);

  const thirdFirstQuestion = () =>{
    setThird(0)
    document.getElementById("waist").style.opacity = 1;
    document.getElementById("hip").style.opacity = 0.3;
    document.getElementById("thigh").style.opacity = 0.3;
    document.getElementById("hem").style.opacity = 0;
  };
  const thirdSecondQuestion = () =>{
    setThird(1)
    document.getElementById("waist").style.opacity = 0.3;
    document.getElementById("hip").style.opacity = 1;
    document.getElementById("thigh").style.opacity = 0.3;
    document.getElementById("hem").style.opacity = 0;
  }
  const thirdThirdQuestion = () =>{
    setThird(2)
    document.getElementById("waist").style.opacity = 0;
    document.getElementById("hip").style.opacity = 0.3;
    document.getElementById("thigh").style.opacity = 1;
    document.getElementById("hem").style.opacity = 0.3;
  }
  const thirdForthQuestion = () =>{
    setThird(3)
    document.getElementById("waist").style.opacity = 0;
    document.getElementById("hip").style.opacity = 0;
    document.getElementById("thigh").style.opacity = 0.3;
    document.getElementById("hem").style.opacity = 1;
  }
  useEffect(() => {
    if(thirdQuestion===0){
      document.getElementById("waist").style.opacity = 1;
      document.getElementById("hip").style.opacity = 0.3;
      document.getElementById("thigh").style.opacity = 0.3;
      document.getElementById("hem").style.opacity = 0;
    }
    tSlideRef.current.style.transition = "all 0.5s ease-in-out";
    tSlideRef.current.style.transform = `translateY(-${thirdQuestion * 70}px)`;
  }, [thirdQuestion]);

  return (
    <div className={classes.container}>
      
      <div className={classes.sliderContainer} ref={slideRef}>
        {/* 검사 시작하기 */}
        <div className={classes.carouselItem1}>
          <p className={!isSBTI ? `${classes["PageName"]}` : `${classes["PageName"]} ${classes.on}`}>STYLE WITH US</p>
          <p className={!isSBTI ? `${classes["SubPageName"]}` : `${classes["SubPageName"]} ${classes.on}`}>스타일 혁신의 가장 확실한 방법</p>
          <img src={man} alt="man" className={!isSBTI ? `${classes["manImg"]}` : `${classes["manImg"]} ${classes.on}`}/><br />
          <button onClick={nextSlide} className={!isSBTI ? `${classes["carouselbutton1"]}` : `${classes["carouselbutton1"]} ${classes.on}`}>
            검사 시작하기
          </button>
        </div>
        {/* 첫번째 슬라이드 */}
        <div className={classes.carouselItem}>
          <img src={left2} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
              <p className={classes.question}>SBTI #1</p>
            <div className={classes.firstQuestion}>
            <div className={classes.answerBox}>
              <div className={classes.answer}>
                <form onSubmit={(event) => {event.preventDefault()}}>
                  <label >
                    <p className={classes.sbtiQuestion}>키를 cm단위로 입력해주세요</p>
                    <input type="number" className={classes.answerInput} value={height} onChange={(event)=> setHeight(event.target.value)}/>  
                  </label>              
                </form>
              </div>
              <div className={classes.answer}>
                <form onSubmit={(event) => {event.preventDefault()}}>
                  <label>
                    <p className={classes.sbtiQuestion}>평소 신으시는 신발 사이즈를 mm 단위로 입력해주세요</p>
                    <input type="number" className={classes.answerInput} value={foot}onChange={(event)=> setFoot(event.target.value)}/>  
                  </label>              
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right2} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 두번째 슬라이드 */}
        <div className={classes.carouselItem}>
        <img src={left2} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
              <p className={classes.question}>SBTI #2</p>
            <div className={classes.yChangeBox}>
            <div className={classes.answerBox} ref={sSlideRef}>
              <div className={classes.answer} id="shoulder">
                <form 
                  onChange={(event) => {
                    secondSecondQuestion(event); 
                    setShoulder(event.target.value);}}
                  onClick={secondFirstQuestion}
                >
                  <p className={classes.sbtiQuestion}>키보드에 비해서 당신의 어깨 넓이는 어느정도 인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 작음</p>
                    {shoulderSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={shoulderSize[idx]}
                        defaultChecked={shoulderSize[idx]===shoulder}
                        name='shoulder'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>
                </form>
              </div>
              <div className={classes.answer} id="chest">
                <form 
                  onChange={(event) => {
                    secondThirdQuestion(event);
                    setChest(event.target.value)}}
                  onClick={secondSecondQuestion}
                >
                  <p className={classes.sbtiQuestion}>가슴 둘레가 큰 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 작음</p>
                    {chesteSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={chesteSize[idx]}
                        defaultChecked={chesteSize[idx]===chest}
                        name='chest'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>           
                </form>
              </div>
              <div className={classes.answer} id="sleeve">
                <form 
                  onChange={(event) => {setSleeve(event.target.value)}}
                  onClick={secondThirdQuestion}
                >
                  <p className={classes.sbtiQuestion}>팔이 긴 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 작음</p>
                    { sleeveSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={ sleeveSize[idx] }
                        defaultChecked={sleeveSize[idx]===sleeve}
                        name='sleeve'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>            
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right2} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 세번째 슬라이드 */}
        <div className={classes.carouselItem}>
        <img src={left2} alt="left1" className={classes.directionImg} onClick={prevSlide}/>
          <div className={classes.surveyBox}>
          <p className={classes.question}>SBTI #3</p>
            <div className={classes.yChangeBox}>
            <div className={classes.answerBox} ref={tSlideRef}>
              <div className={classes.answer} id="waist">
                <form 
                  onChange={(event) => {
                    thirdSecondQuestion(event); 
                    setWaist(event.target.value);}}
                  onClick={thirdFirstQuestion}
                >
                  <p className={classes.sbtiQuestion}>당신의 허리는 개미허리 인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 맞음</p>
                    {waistSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={waistSize[idx]}
                        defaultChecked={waistSize[idx]===waist}
                        name='waist'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>             
                </form>
              </div>
              <div className={classes.answer} id="hip">
                <form 
                  onChange={(event) => {
                    thirdThirdQuestion(event);
                    setHip(event.target.value)}}
                  onClick={thirdSecondQuestion}
                >
                  <p className={classes.sbtiQuestion}>엉덩이가 큰편인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 작음</p>
                    {hipSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={hipSize[idx]}
                        defaultChecked={hipSize[idx]===hip}
                        name='hip'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>            
                </form>
              </div>
              <div className={classes.answer} id="thigh">
                <form 
                  onChange={(event) => {
                    thirdForthQuestion(event);
                    setThigh(event.target.value)}}
                  onClick={thirdThirdQuestion}
                >
                  <p className={classes.sbtiQuestion}>허벅지가 굵은 편인가요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>매우 작음</p>
                    {thighSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={thighSize[idx]}
                        defaultChecked={thighSize[idx]===thigh}
                        name='thigh'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>매우 큼</p>
                  </div>          
                </form>
              </div>
              <div className={classes.answer} id="hem">
                <form 
                  onChange={(event) => {
                    setHem(event.target.value)}}
                  onClick={thirdForthQuestion}
                >
                  <p className={classes.sbtiQuestion}>평소에 바지 통을 크게 입으시나요?</p>
                  <div className={classes.radioBox}>
                    <p className={classes.sbtiAnswer}>대체로 작음</p>
                    {hemSize.map((item, idx) => {
                    return(
                      <Radio 
                        key={idx}
                        value={hemSize[idx]}
                        defaultChecked={hemSize[idx]===hem}
                        name='hem'
                        num={classList[idx]}
                      >
                      </Radio>
                      )
                    })}
                    <p className={classes.sbtiAnswer}>대체로 큼</p>
                  </div>             
                </form>
              </div>
            </div>
            </div>
          </div>
          <img src={right2} alt="right" className={classes.directionImg} onClick={nextSlide}/>
        </div>
        {/* 제출 슬라이드 */}
        <div className={classes.carouselItem1}>
        <div className={classes.carouselItem1}>
          <p className={!isSBTI ? `${classes["PageName"]}` : `${classes["PageName"]} ${classes.on}`}>STYLE WITH US</p>
          <p className={!isSBTI ? `${classes["SubPageName"]}` : `${classes["SubPageName"]} ${classes.on}`}>스타일 혁신의 가장 확실한 방법</p>
          <img src={woman} alt="man" className={!isSBTI ? `${classes["manImg"]}` : `${classes["manImg"]} ${classes.on}`}/><br />
          <button onClick={submitSbti} className={!isSBTI ? `${classes["carouselbutton1"]}` : `${classes["carouselbutton1"]} ${classes.on}`}>
            검사 제출하기
          </button>
        </div>
        </div>
      </div>  
    </div>
  );
};

export default Sbti;
