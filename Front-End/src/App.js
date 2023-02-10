import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home";
import MyPage from "./pages/mypage/MyPage";
import Loading from "./pages/consultant/Loading";
import MyPageWish from "./pages/mypage/MyPageWish";
import MyProfile from './pages/mypage/MyProfile';
import Recommend from './pages/recommend/Recommend';
import ServiceCenter from './pages/servicecenter/ServiceCenter';
import ManageConsultant from "./pages/admin/ManageConsultant";
import Sbti from "./pages/sbti/Sbti";
import NotFound from "./pages/notfound/NotFound"
import DeveloperPage from './pages/developer/DeveloperPage';
import PrivateRoute from "./components/PrivateRoute";
import ConsultantMyPage from "./pages/mypage/consultantmypage/ConsultantMyPage";
import ConsultantReviewPage from './pages/mypage/consultantmypage/ConsultantReviewPage';



function App() {
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
        <Route path="/servicecenter" element={<ServiceCenter />} />
        <Route path="/developerpage" element={<DeveloperPage />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/consultantmypage" element={<ConsultantMyPage/>}/>
          <Route path="/consultantreivewpage" element={<ConsultantReviewPage />}/>
          <Route path="/mypagewish" element={<MyPageWish />}/>
          <Route path="/myprofile" element={<MyProfile/>}/>
          <Route path="/recommend" element={<Recommend/>}/>
          <Route path="/sbti" element={<Sbti/>}/>
          <Route path="/consultant" element={<Loading />}/>
          <Route path='/manageconsultant' element={<ManageConsultant/>}/>
        </Route>
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
