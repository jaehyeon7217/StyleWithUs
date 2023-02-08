import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Start from "./component/Start";
import UserHeight from "./component/UserHeight";
import UserFoot from "./component/UserFoot";
import SlideComponent from "./component/SlideComponent"

import End from "./component/End";

import classes from "./Sbti.module.css";

const totalSlide = 10;
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

  const userGender = useSelector((state) => state.auth.userData.userGender)

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

  const stringToInt = (data) =>{
    const ans = parseInt(data, 10)
    return ans
  }

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
  
  const checkConsole = (event) => {
    event.preventDefault();
    console.log(userGender);
    console.log(height);
    console.log(foot);
    console.log(shoulder);
    console.log(chest);
    console.log(stringToInt(sleeve));
  };

  return (
    <div className={classes.container}>
      {currentSlide}
      <button onClick={checkConsole}></button>
      <div className={classes.sliderContainer} ref={slideRef}>
        <Start setData={nextSlide} />
        <UserHeight setData={setHeight} />
        <UserFoot setData={setFoot} />
        <SlideComponent
          label='shoulder'
          onChange={(event) => {
            setShoulder(event.target.value);
          }}
          value={{userGender} ? [52, 55, 56, 58] : [55, 58, 61, 63]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='chest'
          onChange={(event) => {
            setChest(event.target.value);
          }}
          value={{userGender} ? [56, 59, 61, 63] : [59, 62, 65, 68]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='sleeve'
          onChange={(event) => {
            setSleeve(event.target.value);
          }}
          value={{userGender} ? [56, 58, 60, 61] : [57, 59, 60, 62]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='waist'
          onChange={(event) => {
            setWaist(event.target.value);
          }}
          value={{userGender} ? [33, 34, 36, 39] : [35, 37, 39, 41]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='hip'
          onChange={(event) => {
            setHip(event.target.value);
          }}
          value={{userGender} ? [57, 59, 61, 63] : [55, 57, 59, 62]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='thigh'
          onChange={(event) => {
            setThigh(event.target.value);
          }}
          value={{userGender} ? [31, 34, 35, 35] : [33, 34, 36, 37]}
          size={['S','M','L','XL']}
        />
        <SlideComponent
          label='hem'
          onChange={(event) => {
            setHem(event.target.value);
          }}
          value={{userGender} ? [22, 23, 24, 25] : [25, 26, 27, 28]}
          size={['S','M','L','XL']}
        />
        <End setData={submitSbti} />
      </div>
      <div className={classes.buttonbox}>
        <button onClick={prevSlide} className={classes.carouselbutton}>
          prev
        </button>
        <button onClick={nextSlide} className={classes.carouselbutton}>
          next
        </button>
      </div>
    </div>
  );
};

export default Sbti;
