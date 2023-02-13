import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import classes from "./NavBottom.module.css";
import { useEffect } from "react";

const NavBottom = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const isLogined = useSelector((state) => state.auth.isLogined);
  const userType = useSelector((state) => state.auth.userType);
  const isConsulting = useSelector((state) => state.auth.isConsulting);

  const nonAction = () =>{
    
  }

  const toRecommend = (event) =>{
    event.preventDefault();
    if (isLogined===false){
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인이 필요합니다<div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인을 하고 이용해주세요</div>',
        icon: "error",
        width: 330,
        showCancelButton: true,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인 하러 가기</div>',
        cancelButtonColor: "#F77E7E",
        cancelButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">취소</div>',
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/auth/login");
        }
      });
    }else{
      nonData();
    }
  }

  const toSBTI = (event) =>{
    event.preventDefault();
    if (isLogined===false){
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인이 필요합니다<div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인을 하고 이용해주세요</div>',
        icon: "error",
        width: 330,
        showCancelButton: true,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인 하러 가기</div>',
        cancelButtonColor: "#F77E7E",
        cancelButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">취소</div>',
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/auth/login");
        }
      });
    }else{
      navigate('/sbti')
    }
  }

  const toConsultant = (event) =>{
    event.preventDefault();
    if (isLogined===false){
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인이 필요합니다<div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인을 하고 이용해주세요</div>',
        icon: "error",
        width: 330,
        showCancelButton: true,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인 하러 가기</div>',
        cancelButtonColor: "#F77E7E",
        cancelButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">취소</div>',
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/auth/login");
        }
      });
    }else{
      navigate('/consultant')
    }
  }

  const userData = useSelector((state)=> state.auth.userData);
  const isData = userData.userHeight;

  const nonData = () => {
    if(!!isData===false){
      Swal.fire({
        title:
          '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">SBTI 데이터가 없습니다<div>',
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">SBTI 검사를 하고 추천페이지를 이용해주세요</div>',
        icon: "error",
        width: 330,
        confirmButtonColor: "#9A9A9A",
        confirmButtonText:
          '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
      }).then((result) => {
        if (result.isConfirmed){
          navigate('/sbti')
        }else{
          navigate('/')
        }
      })
    }else{
      navigate('/recommend')
    }
  }


  
  useEffect(()=>{
    if(location.pathname==='/recommend'){
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.fontWeight = "600";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.fontWeight = "300";
    }
    else if(location.pathname==='/sbti'){
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.fontWeight = "600";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.fontWeight = "300";
    }
    else if(location.pathname==='/consultant'){
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.fontWeight = "600";
    }else{
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.fontWeight = "300";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.fontWeight = "300";
    }
    if(userType===1){
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.visibility = "hidden";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.visibility = "hidden";
    }else if(userType===2){
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.visibility = "hidden";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.visibility = "hidden";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.visibility = "hidden";
    }else{
      document.getElementsByClassName(`${classes.LinkBottom}`)[0].style.visibility = "visible";
      document.getElementsByClassName(`${classes.LinkBottom}`)[1].style.visibility = "visible";
      document.getElementsByClassName(`${classes.LinkBottom}`)[2].style.visibility = "visible";
    }
  },[location])


  return(
    <div className={classes.bottom}>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toRecommend}>추천</p>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toSBTI}>SBTI</p>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toConsultant}>컨설턴트 상담</p>
    </div>
  )
}

export default NavBottom