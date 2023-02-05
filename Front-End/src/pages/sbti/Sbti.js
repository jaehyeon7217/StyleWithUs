import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Age from './Age'
import Height from './Height'
import Top from './Top'
import Bottom from './Bottom'
import classes from "./Sbti.module.css"

const totalSlide = 3;
const Sbti = () =>{
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [foot, setFoot] = useState('');
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= totalSlide) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(currentSlide);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; 
    // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);

  const submitSbti = (event) => {
    event.preventDefault();
    const url = "https://i8d105.p.ssafy.io/be/user/update"
    axios.put(
      url,
      {
        userId: userData.userId,
        userName: userData.userName,
        userNickname: userData.userNickName,
        userEmail: userData.userEmail,
        userGender: userData.userGender,
        userHeight: height,
        userTop: top,
        userBottom: bottom,
        userFoot: foot,
        userAge: age,
      },
      { 
        headers: {
          Authorization: token,
        },
      }
    ).then((res)=>{
      console.log(res);
      navigate('/')
    }).catch(error => {
      console.log(error);
    })
  }
  const checkConsole = (event) =>{
    event.preventDefault();
    console.log(age)
    console.log(height)
    console.log(foot)
    console.log(top)
    console.log(bottom)
  }

  return(
    <div className={classes.container}>
      {currentSlide}
      <button onClick={checkConsole}></button>
      <div className={classes.sliderContainer} ref={slideRef}>
        <Age setData={setAge}/>
        <Height setData={setHeight}/>
        <Top setData={setTop}/>
        <Bottom setData={setBottom}/>
      </div>
      <div className={classes.buttonbox}>
        <button onClick={prevSlide} className={classes.carouselbutton}>prev</button>
        <button onClick={nextSlide} className={classes.carouselbutton}>next</button>
      </div>
      
    </div>
  );
}

export default Sbti;