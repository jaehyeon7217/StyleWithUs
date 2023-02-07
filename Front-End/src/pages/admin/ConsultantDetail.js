import axios from "axios";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

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
    <div>
      <p>{consultantId}</p>
      <p>{consultantResume}</p>
      <p>{consultantApproval}</p>
      <button onClick={approveConsultant}>approve</button>
      <p></p>
    </div>
  )
};

export default ConsultantDetail;