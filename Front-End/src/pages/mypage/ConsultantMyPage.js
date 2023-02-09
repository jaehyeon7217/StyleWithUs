import { useDispatch ,useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";


const ConsultantMyPage = () => {
  const dispatch = useDispatch();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const [review, setReview] = useState("");

  const getMyData = () =>{
    const url = "https://i8d105.p.ssafy.io/be/consultant/get/" + consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization : token
        }
      }
    ).then(response => {
      if (response.status===200){
        console.log('success');
        dispatch(authActions.getMyData(response.data.data))
      }
    }).catch(error =>{
      console.log(error);
    })    
  }

  const getMyReview = () =>{
    const url = "https://i8d105.p.ssafy.io/be/review/show/" + consultantId
    axios.get(
      url,
      {
        headers:{
          Authorization : token
        }
      }
    ).then((response)=>{
      console.log(response);
      setReview(response.data.data)
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(() => {
    getMyData();
    getMyReview();
  }, [])

  return(
    <div>
      <p>{data.consultantId}</p>
      <p>{data.consultantEmail}</p>
      <p>{data.consultantResume}</p>
    </div>
  )
};

export default ConsultantMyPage;