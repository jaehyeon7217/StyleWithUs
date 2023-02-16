import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../store/auth"
import Swal from "sweetalert2"
import { useEffect } from "react"
import classes from "./NavTop.module.css"
import { useNavigate, useLocation } from "react-router-dom"

const NavTop = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLogined = useSelector((state)=> state.auth.isLogined)
  const userType = useSelector((state) => state.auth.userType)
  const isConsulting = useSelector((state) => state.auth.isConsulting)

  const nonAction = () =>{
    
  }
  
  const toLogin = (event) =>{
    event.preventDefault();
    navigate('/auth/login')
  }
  const toSignup = (event) =>{
    event.preventDefault();
    navigate('/auth/signup')
  }
  const toMypage = (event) =>{
    event.preventDefault();
    if(userType===0){
      navigate('/mypage')
    }else if(userType===1){
      navigate('/consultantmypage')
    }else{
      navigate('/manageconsultant')
    }
  }

  const toWishPage = (event) => {
    event.preventDefault();
    navigate('/mypagewish')
  }

  const test = () =>{
    Swal.fire({
      title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그아웃 되었습니다<div>', 
      html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">Style With Us</div>', 
      width : 330,
      icon: 'success',
      confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
    })
  }

  const toLogout = () =>{
    navigate('/')
    dispatch(authActions.logout(''))
    setTimeout(test, 800);
  }
  useEffect(()=>{
    if(location.pathname==='/auth/login'){
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_Bold";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_ULight";
    }else if(location.pathname==='/auth/signup'){
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_Bold";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_ULight";
    }else if(location.pathname==='/mypage'){
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_Bold";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_ULight";
    }else if(location.pathname==='/consultantmypage'){
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_Bold";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_ULight";
    }else if(location.pathname==='/mypagewish'){
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_Bold";
    }else{
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.fontFamily = "Apple_Gothic_Neo_ULight";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.fontFamily = "Apple_Gothic_Neo_ULight";
    }
    if(isLogined){
      if(userType){
        document.getElementsByClassName(`${classes.LinkTop}`)[0].style.display= "none";
        document.getElementsByClassName(`${classes.LinkTop}`)[1].style.display= "none";
        document.getElementsByClassName(`${classes.LinkTop}`)[2].style.display= "block";
        document.getElementsByClassName(`${classes.LinkTop}`)[3].style.display= "none";
        document.getElementsByClassName(`${classes.LinkTop}`)[4].style.display= "block";
      }else{
        document.getElementsByClassName(`${classes.LinkTop}`)[0].style.display= "none";
        document.getElementsByClassName(`${classes.LinkTop}`)[1].style.display= "none";
        document.getElementsByClassName(`${classes.LinkTop}`)[2].style.display= "block";
        document.getElementsByClassName(`${classes.LinkTop}`)[3].style.display= "block";
        document.getElementsByClassName(`${classes.LinkTop}`)[4].style.display= "block";
      }
    }else{
      document.getElementsByClassName(`${classes.LinkTop}`)[0].style.display= "block";
      document.getElementsByClassName(`${classes.LinkTop}`)[1].style.display= "block";
      document.getElementsByClassName(`${classes.LinkTop}`)[2].style.display= "none";
      document.getElementsByClassName(`${classes.LinkTop}`)[3].style.display= "none";
      document.getElementsByClassName(`${classes.LinkTop}`)[4].style.display= "none";
    }
  })
  return(
    <div className={classes.top}>
      <p className={classes.LinkTop} onClick={toLogin}>로그인</p>
      <p className={classes.LinkTop} onClick={toSignup}>회원가입</p>
      <p className={classes.LinkTop} onClick={isConsulting ? nonAction : toMypage}>마이페이지</p>
      <p className={classes.LinkTop} onClick={isConsulting ? nonAction : toWishPage}>장바구니</p>
      <p className={classes.LinkTop} onClick={isConsulting ? nonAction : toLogout}>로그아웃</p>
    </div>
  )
}

export default NavTop