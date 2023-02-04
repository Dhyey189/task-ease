import React from "react";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
import Header from './Header.js';
import Signup from './Signup.js';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<><Header/></>} />
            <Route path="/about" element={<><Header/></>}/>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </>
  );
}

export default App;
