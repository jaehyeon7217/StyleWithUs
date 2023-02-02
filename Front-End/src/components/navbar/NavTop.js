import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../store/auth"
import Swal from "sweetalert2"

import classes from "./NavTop.module.css"
import { Link, useNavigate } from "react-router-dom"

const NavTop = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogined = useSelector((state)=> state.auth.isLogined)

  const toLogin = (event) =>{
    event.preventDefault();
    navigate('/auth/login')
  }
  const toSignup = (event) =>{
    event.preventDefault();
    navigate('/auth/usersignup')
  }
  const toMypage = (event) =>{
    event.preventDefault();
    navigate('/mypage')
  }
  const toLogout = (event) =>{
    event.preventDefault();
    dispatch(authActions.logout(''))
    Swal.fire({
      title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그아웃 되었습니다<div>', 
      html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">Style With Us</div>', 
      width : 330,
      icon: 'success',
      confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
    }).then(()=>{
      navigate('/')
    })
  }

  return(
    <div className={classes.top}>
      <p className={(isLogined ? classes.LinkTopHidden : classes.LinkTop)} onClick={toLogin}>로그인</p>
      <p className={(isLogined ? classes.LinkTopHidden : classes.LinkTop)} onClick={toSignup}>회원가입</p>
      <p className={(!isLogined ? classes.LinkTopHidden : classes.LinkTop)} onClick={toMypage}>마이페이지</p>
      <p className={(!isLogined ? classes.LinkTopHidden : classes.LinkTop)} onClick={toLogout}>로그아웃</p>
    </div>
  )
}

export default NavTop