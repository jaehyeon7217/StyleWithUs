import NavBar from './components/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Home from './pages/Home/Home';
import MyPage from './pages/MyPage';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/*" element={<Auth/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
