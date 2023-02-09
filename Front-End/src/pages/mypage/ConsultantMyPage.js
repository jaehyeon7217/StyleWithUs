import { useDispatch ,useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { useEffect } from "react";


const ConsultantMyPage = () => {
  const dispatch = useDispatch();
  const consultantId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.userData);
  const review = useSelector((state) => state.auth.myReviewList);

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
        dispatch(authActions.getMyData(response.data.data))
      }
    }).catch(error =>{
      console.log(error);
    })    
  };

  useEffect(() => {
    getMyData();
  }, []);

  return(
    <div>
      <h1>My Data</h1>
      <p>{data.consultantId}</p>
      <p>{data.consultantEmail}</p>
      <p>{data.consultantResume}</p>
      <hr /><hr />
      <h1>My Review</h1>
      <hr />
      {review.map((item,idx) => {
        return(
          <div key={idx}>
            <p >{review[idx].userId}</p>
            <p >{review[idx].reviewScore}</p>
            <p >{review[idx].reviewContent}</p>
            <hr />
          </div>
          )
        })}
    </div>
  );
};

export default ConsultantMyPage;