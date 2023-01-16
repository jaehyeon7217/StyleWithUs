import { Route, Routes } from "react-router-dom";
import "./App.css"
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home/Home"

import NavBar from "./components/navbar/NavBar";


function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/*" element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;