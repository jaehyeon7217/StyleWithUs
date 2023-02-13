import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import classes from './ConsultantMyProfile.module.css'
import consultantWoman from '../../../assets/consultantwoman.png';
import consultantman from '../../../assets/consultantman.png';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../store/auth';

const ConsultantMyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);
  const reviewAvg = useSelector((state) => state.auth.reviewAvg);
    

  const [msg, setMsg] = useState("");

  const reviewMsg = () =>{
    if (reviewAvg === 5){
      setMsg("완벽한 우수 컨설턴트")
    }else if(reviewAvg>=4){
      setMsg("성장하는 우수 컨설턴트")
    } else if (reviewAvg >=3){
      setMsg("예비 우수 컨설턴트")
    } else if(reviewAvg >=2){
      setMsg("분발해야 하는 컨설턴트")
    } else if (reviewAvg >=1){
      setMsg("해고 위기 컨설턴트")
    } else if (reviewAvg ==0){
      setMsg("성장하는 신입 컨설턴트")
    }
  }

  const editResume = (event) =>{
    event.preventDefault();
    Swal.fire({
      input: "textarea",
      title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">경력 기술서<div>',
      inputPlaceholder: "",
      inputValue: data.consultantResume,
      width: 800,
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      confirmButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">변경</div>',
      confirmButtonColor: "#9A9A9A",
      cancelButtonColor: "#F77E7E",
      cancelButtonText: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">취소</div>',
    }).then((result) => {
      if (result.value) {
        axios.put(
          "https://i8d105.p.ssafy.io/be/consultant/update",
          {
            consultantApproval: data.consultantApproval,
            consultantEmail: data.consultantEmail,
            consultantGender: data.consultantGender,
            consultantId: data.consultantId,
            consultantName: data.consultantName,
            consultantNickname: data.consultantNickname,
            consultantResume: result.value
          },
          {
            headers: {
              Authorization: token,
            },
          }).then((response) =>{
            dispatch(authActions.newSBTi(response.data))
            navigate("/consultantmypage");
          }).catch((err) =>{
            console.log(err);
          })
      }
    });
  }    

  useEffect(()=>{
      reviewMsg();
    },[])

  return(
    <div className={classes.ProfilePage}>
        <ConsultantMyPageSideBar />
        <div className={classes.ProfileMainBox}>
        <h3 className={classes.ProfileNameMain}>프로필</h3>
        <hr className={classes.hr} />
        <div className={classes.ImgTextBox}>
                <p >{(data.consultantGender ? <img src={consultantman} className={classes.consultantman} /> : <img src={consultantWoman} className={classes.consultantWoman} />)}</p>
            <div>
                <p className={classes.consultantName}>{data.consultantName}</p>
                <p className={classes.userType}>컨설턴트</p>
            </div>
            <div className={classes.levelbox}>
                <p className={classes.leveltitle}>LV {reviewAvg}</p>
                <div className={classes.VLine}></div>
                <p className={classes.msg}>{msg}</p>

            </div>
        </div>
        <hr className={classes.hrgrey} />
        <div>
            <div>
                <h3 className={classes.ProfileName}>경력 기술서</h3>
                    <div className={classes.ResumeBox}>
                        <p className={classes.ResumeName}>경력</p>
                        <div className={classes.vline}></div>
                        <p className={classes.consultantResume}>{data.consultantResume}</p>
                    </div>
                    <button className={classes.resumebtn} onClick={editResume}>+ 경력 수정하기</button>
            </div>
            <div>
                <br/>
                <h3 className={classes.ProfileName}>개인정보</h3>
                <p className={classes.PersonalSmallLabel}>이름</p>
                <p className={classes.userData}>{data.consultantName}</p>
                <div className={classes.BottomShort}></div>
                <p className={classes.PersonalSmallLabel}>닉네임</p>
                <p className={classes.userData}>{data.consultantNickname}</p>
                <div className={classes.BottomShort}></div>
                <p className={classes.PersonalSmallLabel}>아이디</p>
                <p className={classes.userData}>{data.consultantId}</p>
                <div className={classes.BottomShort}></div>
                <p className={classes.PersonalSmallLabel}>이메일</p>
                <p className={classes.userData}>{data.consultantEmail}</p>
                <div className={classes.BottomShort}></div>
                <p className={classes.PersonalSmallLabel}>성별</p>
                <p className={classes.userData}>{(data.consultantGender ? "남" : "여")}</p>
                <div className={classes.BottomShort}></div>
                <br/><br/>
            </div>
        </div>
        </div>

    </div>
  )
}

export default ConsultantMyProfile;