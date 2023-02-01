import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "./components/navbar/NavBar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home";
import MyPage from "./pages/mypage/MyPage";
import Loading from "./pages/consultant/video/Loading";
import Consultant from "./pages/consultant/Consultant";
import codeNumber from "./pages/consultant/shop/CodeNumber";
import { shopActions } from "./store/shop";

function App() {
  // 대기창 설정
  // setTimeout을 이용하여 처음 5초간 Loading 페이지를 보여주고
  // 이후에 컨설턴트 페이지
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [loading]);

  // redux의 shop을 업데이트 하기 위한 변수
  const [updateShop, setUpdateShop] = useState(false);
  
  const dispatch = useDispatch();
  const category = useSelector((state) => state.shop.category);
  const arrayCategory = Object.keys(category);

  useEffect(() => {
    if (updateShop === false) {
      for (const type of arrayCategory) {
        const arrayType = Object.keys(codeNumber[type]);
        for (const detail of arrayType) {
          const url = `https://i8d105.p.ssafy.io/be/data/${codeNumber[type][detail]}`;
      
          axios
          .get(url)
            .then((response) => {
              console.log('data response');
              const payload = {type, detail, data: response.data.data}
              dispatch(shopActions.downloadData(payload));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
      setUpdateShop(true);
    }
  }, []);

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
