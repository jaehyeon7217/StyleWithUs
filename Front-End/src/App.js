import { Route, Routes } from "react-router-dom";
import "./App.css"
import Auth from "./pages/auth/Auth";

import NavBar from "./components/navbar/NavBar";


function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/auth/*" element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;