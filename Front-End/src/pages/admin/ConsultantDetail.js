import axios from "axios";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import classes from './ConsultantDetail.module.css'
import { Navigate, useNavigate } from "react-router-dom";

const ConsultantDetail = (props) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const consultantId = props.data.consultantId;
  const consultantResume = props.data.consultantResume;
  const token = useSelector((state)=> state.auth.token);
  const consultantApproval = props.data.consultantApproval;


  const approveConsultant = (event) => {
    event.preventDefault();
    const url = 'https://i8d105.p.ssafy.io/be/admin/approval/'+ consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization: token,
        }
      }
    ).then(()=>{
      axios.get(
        'https://i8d105.p.ssafy.io/be/admin/list',
        {
          headers:{ Authorization : token }
        }).then((response)=>{
          dispatch(authActions.getConsultantList(response.data.data))
        }).catch((error)=>{
          if(error.response.status===401){
            Swal.fire({
              title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>', 
              html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>', 
              width : 330,
              icon: 'error',
              confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
              confirmButtonColor: '#9A9A9A',
            }).then(()=>{
              navigate('/')
              dispatch(authActions.logout(""))
            })
          }
        })
    }).catch((error)=>{
      if(error.response.status===401){
        Swal.fire({
          title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>', 
          html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>', 
          width : 330,
          icon: 'error',
          confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
          confirmButtonColor: '#9A9A9A',
        }).then(()=>{
          navigate('/')
          dispatch(authActions.logout(""))
        })
      }
    })
  };

  return(
    <div className={classes.detailBox}>
      <hr className={classes.hrblack}/>
      <div className={classes.idBox}>
        <p className={classes.consultantId}>{consultantId}</p> 
        <button onClick={approveConsultant} className={classes.approveButton}>{consultantApproval ? '승인': '미승인'}</button>
      </div>
      <hr className={classes.hrgrey}/>
      <div className={classes.resumeBox}>
        <p className={classes.consultantResume}>{consultantResume}</p>
      </div>
    </div>
  )
};

export default ConsultantDetail;