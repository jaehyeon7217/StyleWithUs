import { useSelector } from "react-redux";
import ConsultantDetail from "./ConsultantDetail";

const ManageConsultant = () => {

  const consultantList = useSelector((state) => state.auth.consultantList);
  
  return(
    <div>
      <h1>컨설턴트 승인 페이지</h1>
      <div>
        {consultantList.map((item, idx) => {
          return(
            <ConsultantDetail 
              key={idx} 
              data={consultantList[idx]}
            />
          )
        })}
      </div>
      <div>

      </div>
    </div>
  )
}

export default ManageConsultant;