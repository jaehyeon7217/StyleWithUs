import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./components/navbar/NavBar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home";
import MyPage from "./pages/mypage/MyPage";
import Loading from "./pages/consultant/video/Loading";
import Consultant from "./pages/consultant/Consultant";

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

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/mypage" element={<MyPage />} />
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
