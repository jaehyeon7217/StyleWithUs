import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home";
import MyPage from "./pages/mypage/MyPage";
import Loading from "./pages/consultant/video/Loading";
import Consultant from "./pages/consultant/Consultant";
import MyPageWish from "./pages/mypage/MyPageWish";
import MyProfile from './pages/mypage/MyProfile';
import Recommend from './pages/recommend/Recommend';
import ServiceCenter from './pages/servicecenter/ServiceCenter';
import OnetoOneQuestion from './pages/servicecenter/OnetoOneQuestion';
import ManageConsultant from "./pages/admin/ManageConsultant";
import Sbti from "./pages/sbti/Sbti";


function App() {
  // 대기창 설정
  // setTimeout을 이용하여 처음 5초간 Loading 페이지를 보여주고
  // 이후에 컨설턴트 페이지
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [loading]);

  const ChangeLoadingHandler = (newLoadingStatus) => {
    setLoading(newLoadingStatus);
  };

  // 파라미터 값을 가져온다.
  const location = useLocation();

  // 파라미터 값을 통해 root의 overflow를 변경한다.
  const rootTag = document.getElementById("root");
  if (location.pathname === '/') {
    rootTag.style.overflow = "hidden";
  } else {
    rootTag.style.overflow = "overlay";
  }

  return (
    <div id="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypagewish" element={<MyPageWish />}/>
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/recommend" element={<Recommend/>}/>
        <Route path="/servicecenter" element={<ServiceCenter />} />
        <Route path="/onetoonequestion" element={<OnetoOneQuestion />}></Route>
        <Route path="/sbti" element={<Sbti/>}/>
        <Route path='manageconsultant' element={<ManageConsultant/>}></Route>
        <Route
          path="/consultant"
          // element={displayStatus}
          element={
            loading ? (
              <Loading />
            ) : (
              <Consultant onChangeLoading={ChangeLoadingHandler} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
