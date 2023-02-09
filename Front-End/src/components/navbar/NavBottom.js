import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


import classes from "./NavBottom.module.css";

const NavBottom = () =>{
  const navigate = useNavigate();
  const isLogined = useSelector((state)=> state.auth.isLogined)

  const isConsulting = useSelector((state) => state.auth.isConsulting)

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
      navigate('/recommend')
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
    
  return(
    <div className={classes.bottom}>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toRecommend}>추천</p>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toSBTI}>SBTI</p>
      <p className={classes.LinkBottom} onClick={isConsulting ? nonAction : toConsultant}>컨설턴트 상담</p>
      {/* <NavLink to="/recommend" className={(navData) => navData.isActive ? classes['LinkBottom-active'] : classes.LinkBottom}>추천</NavLink>  */}
      {/* <NavLink to="/sbti" className={(navData) => navData.isActive ? classes['LinkBottom-active'] : classes.LinkBottom}>SBTI</NavLink>  */}
      {/* <NavLink to="/consultant" className={(navData) => navData.isActive ? classes['LinkBottom-active'] : classes.LinkBottom} >컨설턴트 상담</NavLink> */}
    </div>
  )
}

export default NavBottom