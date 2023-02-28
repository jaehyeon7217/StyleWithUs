import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

// 로그인 유저만 접근 가능
const PrivateRoute = () => {
  const isLogined = useSelector((state) => state.auth.isLogined);

  if (!isLogined) {
    Swal.fire({
      title:
        '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">로그인이 필요합니다<div>',
      html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">로그인을 하고 이용해주세요</div>',
      icon: "error",
      width: 330,
      confirmButtonColor: "#9A9A9A",
      confirmButtonText:
        '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
    });
  }

  return isLogined ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
