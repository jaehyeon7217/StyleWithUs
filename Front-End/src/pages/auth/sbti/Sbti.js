import axios from "axios";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./Sbti.module.css"


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

  return(
    <div className={classes.sbtibox}>
      <div className={classes.carouselbox}>
      <button>prev</button>
        <h1>first</h1>
      <button>next</button>
      </div>
    </div>
  );
}

export default Sbti;