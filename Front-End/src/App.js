import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavBar from './components/navbar/NavBar';
import Auth from './pages/auth/Auth';
import Home from './pages/Home/Home';
import MyPage from './pages/MyPage';
import Consultant from './pages/consultant/Consultant';


function App() {
  // consultant 페이지에 들어갔을 때 navbar 표시를 확인 할 변수
  const [displayNavBar, setDisplayNavBar] = useState(true);

  // location을 통해 url의 값을 가져온다
  const location = useLocation();

  // useEffect로 location의 path가 변경될 때 마다 판단을 하여 
  // location.path가 consultant 페이지에 들어왔을 때 navbar의
  // boolean형을 변형한다.
  useEffect(() => {
    if (location.pathname === '/consultant') {
      setDisplayNavBar(false);
    } else {
      setDisplayNavBar(true);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {displayNavBar && <NavBar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/*" element={<Auth/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/consultant" element={<Consultant/>}/>
      </Routes>
    </div>
  );
}

export default App;
