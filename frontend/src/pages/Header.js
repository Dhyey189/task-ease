import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import getWithExpiry from "../utils/GetWithExpiry";
import { SiTodoist } from "react-icons/si";
import mainpageimg from "/home/dhyey/Myprojects/task-ease/frontend/src/pages/taskease-main-page.png";
import {Button} from "../components/"
const Header = () => {
  const user = getWithExpiry("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/app/");
    }
  }, []);

  const bgimageStyle = {
    backgroundImage: `url(${mainpageimg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "85vh",
  };

  return (
    <>
      
      <div className="flex justify-around h-1/5 m-5 text-2xl">
        <div className="flex justify-left w-1/5">
          <div>
            <SiTodoist />
          </div>
          <div className="ml-5">TaskEase</div>
        </div>
        <div className="">
          <Link to="/login" className="mr-5">
            About us
          </Link>
          <Link to="/login" className="mr-5">
            Login
          </Link>
          <Link to="/signup" className="mr-5">
            <button className="border-2 border-solid rounded-md border-black hover:bg-black hover:text-white p-1">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="" style={bgimageStyle}>
        <div className="text-4xl fixed font-bold w-2/5 h-full ">
          <p className="m-5 ml-10">
            Welcome to TaskEase Organise Your all task in one place
          </p>
          <Link to="/signup" className="m-16">
            <button className="border-2 border-solid rounded-md border-teal-400 font-normal  hover:bg-yellow-100  p-1">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
