import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";
import Home from "./pages/Home/Home";
import Auth from "./pages/auth/Auth";
import ManageConsultant from "./pages/admin/ManageConsultant";
import MyPage from "./pages/mypage/MyPage";
import ConsultantMyPage from "./pages/mypage/consultantmypage/ConsultantMyPage";
import ConsultantReviewPage from './pages/mypage/consultantmypage/ConsultantReviewPage';
import MyPageWish from "./pages/mypage/MyPageWish";
import MyProfile from './pages/mypage/MyProfile';
import ServiceCenter from './pages/servicecenter/ServiceCenter';
import DeveloperPage from './pages/developer/DeveloperPage';
import Recommend from './pages/recommend/Recommend';
import Sbti from "./pages/sbti/Sbti";
import Loading from "./pages/consultant/Loading";
import ConsultantMyProfile from './pages/mypage/consultantmypage/ConsultantMyProfile';
import ConsultantServiceCenter from './pages/mypage/consultantmypage/ConsultantServiceCenter';

import NotFound from "./pages/notfound/NotFound"


import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

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
        <Route element={<PublicRoute/>}>
          <Route path="/auth/*" element={<Auth />} />
        </Route>
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
          <Route path="/consultantmyprofile" element={<ConsultantMyProfile/>}></Route>
          <Route path="/consultantservicecenter" element={<ConsultantServiceCenter />}></Route>
        </Route>
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
