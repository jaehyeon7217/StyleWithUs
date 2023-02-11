import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import man from "../../assets/mainPage/컨설턴트.png"

import classes from "./Sbti.module.css";

const totalSlide = 4;
const Sbti = () => {
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [height, setHeight] = useState("");
  const [foot, setFoot] = useState("");
  // 상체 정보
  const [shoulder, setShoulder] = useState("");
  const [chest, setChest] = useState("");
  const [sleeve, setSleeve] = useState("");
  // 하체 정보
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [hem, setHem] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const userGender = useSelector((state) => state.auth.userData.userGender);

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
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        console.log(token);
        console.log(userData);
      });
  };

  const nextQuestion = () =>{

  }

  return (
    <div className={classes.container}>
      
      <div className={classes.sliderContainer} ref={slideRef}>

        <div className={classes.carouselItem1}>
          <p className={classes.PageName}>STYLE WITH US</p>
          <p className={classes.SubPageName}>스타일 혁신의 가장 확실한 방법</p>
          <img src={man} alt="" /><br />
          <button onClick={nextSlide} className={classes.carouselbutton1}>
            검사 시작하기
          </button>
        </div>

        <div className={classes.carouselItem}>
          <button onClick={prevSlide} className={classes.carouselbutton}>
            prev
          </button>
          <div className={classes.surveyBox}>
           <p className={classes.question}>SBTI #1</p>
           <p>정확한 스타일 진단을 위해 솔직하게 답변해 주세요</p>
           <div className={classes.answerBox}>
            <p>키</p>
            <input type="text" />
           </div>
           <div className={classes.answerBox}>
            <p>발 사이즈</p>
            <input type="text" />
           </div>
          </div>
          <button onClick={nextSlide} className={classes.carouselbutton}>
            next
          </button>
        </div>

        <div className={classes.carouselItem}>
          <button onClick={prevSlide} className={classes.carouselbutton}>
            prev
          </button>
          <h1>test3</h1>
          <button onClick={nextSlide} className={classes.carouselbutton}>
            next
          </button>
        </div>

        <div className={classes.carouselItem}>
          <button onClick={prevSlide} className={classes.carouselbutton}>
            prev
          </button>
          <h1>test4</h1>
          <button onClick={nextSlide} className={classes.carouselbutton}>
            next
          </button>
        </div>

        <div className={classes.carouselItem1}>
          <p className={classes.PageName}>STYLE WITH US</p>
          <p className={classes.SubPageName}>스타일 혁신의 가장 확실한 방법</p>
          <img src={man} alt="" /><br />
          <button onClick={submitSbti} className={classes.carouselbutton1}>
            제출하기
          </button>
        </div>
      </div>  
    </div>
  );
};

export default Sbti;
