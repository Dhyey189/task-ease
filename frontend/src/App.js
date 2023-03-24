import React,{useEffect} from "react";
import { Route, Routes,useNavigate,Navigate } from "react-router-dom";
import Header from "./pages/Header.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import MainApp from "./pages/MainApp.js";


import getWithExpiry from "./utils/GetWithExpiry";

function App() {
  const user = getWithExpiry("user");
  return (
    <>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/app/*" element={ <MainApp />} />
          
          
          <Route path="/about" element={<Header />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
