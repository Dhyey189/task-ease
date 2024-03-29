import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import "../styles/App.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import storeUser from "../utils/StoreUser";
import getWithExpiry from "../utils/GetWithExpiry";

function Signup() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    if (getWithExpiry("user")) {
      navigate("/");
    }

    if (queryParameters.get("code") && queryParameters.get("scope")) {
      axios
        .get(
          `http://127.0.0.1:8000/user-accounts/signin/google/?${queryParameters}&from=signup`
        )
        .then((response) => {
          storeUser(response.data);
          navigate("/");
        })
        .catch((error) => console.log(error));
    } else if (queryParameters.get("error")) {
      console.log(queryParameters.get("error"));
    }
  }, []);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "http://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "signup/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id:
        "687665350095-vbhb1m7takg6a27piqah8ji3je828tq7.apps.googleusercontent.com",
      redirect_uri: `http://localhost:3000/${redirectUri}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  return (
    <>
      <div className="signup-box">
        <p className="heading">
          {" "}
          Join{" "}
          <Link className="remove-link-decoration " to="/">
            TaskEase
          </Link>{" "}
        </p>
        <button className="flex flex-row text-2xl border-2 border-solid border-black rounded-3xl p-1.5 ml-10 mt-24 hover:bg-black hover:text-white" onClick={openGoogleLoginPage}>
          <i className="p-1.5">
            <FcGoogle />
          </i>
          Signup with Google
        </button>
        <p className="have-account">
          Already have an account?{" "}
          <Link className="remove-link-decoration " to="/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
