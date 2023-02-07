import axios from "axios";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

import classes from './ConsultantDetail.module.css'

const ConsultantDetail = (props) =>{
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
          console.log(error);
        })
    }).catch((error)=>{
      console.log(error);
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