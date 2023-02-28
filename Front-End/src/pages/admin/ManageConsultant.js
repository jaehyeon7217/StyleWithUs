import { useSelector } from "react-redux";
// component
import ConsultantDetail from "./ConsultantDetail";
// css style
import classes from "./ManageConsultant.module.css";

const ManageConsultant = () => {
  const consultantList = useSelector((state) => state.auth.consultantList);

  return (
    <div className={classes.container}>
      <h1>컨설턴트 승인 페이지</h1>
      {consultantList.map((item, idx) => {
        return <ConsultantDetail key={idx} data={consultantList[idx]} />;
      })}
    </div>
  );
};

export default ManageConsultant;
