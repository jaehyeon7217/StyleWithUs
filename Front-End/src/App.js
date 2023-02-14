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
import ServiceCenterCopy from './pages/servicecenter/ServiceCenterCopy';
import PasswordChange from "./pages/auth/password/PasswordChange";
import UseStyleWithUs from "./pages/usestylewithus/UseStyleWithUs";
import MyPersonalColor from "./pages/personal/MyPersonalColor";
import MyPersonalColorSpring from "./pages/personal/MyPersonalColorSpring";
import MyPersonalColorSummer from "./pages/personal/MyPersonalColorSummer";
import MyPersonalColorFall from "./pages/personal/MyPersonalColorFall";

import NotFound from "./pages/notfound/NotFound"


import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Footer from './components/Footer/Footer';
import MyPersonalColorWinter from "./pages/personal/MyPersonalColorWinter";

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
        <Route path="/servicecenter" element={<ServiceCenter />} />
        <Route path="/developerpage" element={<DeveloperPage />} />
        <Route path="/servicecentercopy" element={<ServiceCenterCopy />}/>
        <Route path="/usestylewithus" element={<UseStyleWithUs/>}></Route>
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
          <Route path="/mypersonal-color" element={<MyPersonalColor/>}/>
          <Route path="/mypersonal-color/spring" element={<MyPersonalColorSpring/>}/>
          <Route path="/mypersonal-color/summer" element={<MyPersonalColorSummer/>}/>
          <Route path="/mypersonal-color/fall" element={<MyPersonalColorFall/>}/>
          <Route path="/mypersonal-color/winter" element={<MyPersonalColorWinter/>}/>
          <Route path="/consultant" element={<Loading />}/>
          <Route path='/manageconsultant' element={<ManageConsultant/>}/>
          <Route path="/consultantmyprofile" element={<ConsultantMyProfile/>}></Route>
          <Route path="/consultantservicecenter" element={<ConsultantServiceCenter />}/>
          <Route path="/passwordchange" element={<PasswordChange/>}/>
        </Route>
        <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
