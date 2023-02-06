import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ManageConsultant = () => {
  const token = useSelector((state) => state.auth.token)
  const [consultantList, setConsultantList] = useState(null);
  const [consultantId, setConsultantId] = useState('');

  const getConsultantResume = () =>{
    const url = 'https://i8d105.p.ssafy.io/be/admin/list'
    axios.get(
      url,
      {
        headers:{
          Authorization: token,
        }
      }
    ).then((response)=>{
      console.log(response.data.data);
    }).catch((error)=>{
      console.log(error);
      console.log(token);
    })
  }

  const approveConsultant = (event) => {
    event.preventDefault();
    const url = `https://i8d015.p.ssafy.io/be/admin/appproval/${consultantId}`
    axios.get(
      url,
      {
        hedaers:{
          Authorization: token,
        }
      }
    ).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(() => {
    getConsultantResume();
  }, [])


  return(
    <div>
      <h1>컨설턴트 승인 페이지</h1>
      <button onClick={(event) =>{
        event.preventDefault();
        getConsultantResume();}}>
        컨설턴트 불러오기
      </button>
      <div></div>
      <div>

      </div>
    </div>
  )
}

export default ManageConsultant;