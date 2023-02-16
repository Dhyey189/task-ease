import React from "react";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
import Header from './Header.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Sidebar from "./Sidebar.js";
import Navbar2 from "./Navbar2.js";

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<><Header/></>} />
            <Route path="/sidebar" element={<><Sidebar/></>}/>
            <Route path="/about" element={<><Header/></>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/navbar2" element={<Navbar2 />} />
          </Routes>
        </Router>
      </>
  );
}

export default App;
