import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import "../styles/App.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import storeUser from "../utils/StoreUser";
import getWithExpiry from "../utils/GetWithExpiry";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function Login() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false)
  const [errmessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (getWithExpiry("user")) {
      navigate("/");
    }

    if (queryParameters.get("code") && queryParameters.get("scope")) {
      axios
        .get(
          `http://127.0.0.1:8000/user-accounts/signin/google/?${queryParameters}&from=login`
        )
        .then((response) => {
          storeUser(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response);
          setAlert(true);
          setErrorMessage("User not found! Please try using another account.")
        });
    } else if (queryParameters.get("error")) {
      console.log(queryParameters.get("error"));
    }
  }, []);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "http://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "login/";

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
          Welcome back to{" "}
          <Link className="remove-link-decoration " to="/">
            TaskEase.
          </Link>{" "}
        </p>
        <div className="m-5">
        {
         alert && errmessage &&
        (<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <span style={{"whiteSpace" : "pre-line"}}>{errmessage}</span>
                
        </Alert>)
        }
      </div>
        <button className="flex flex-row text-2xl border-2 border-solid border-black rounded-3xl p-1.5 ml-10 mt-24 hover:bg-black hover:text-white" onClick={openGoogleLoginPage}>
          <i className="p-1.5">
            <FcGoogle />
          </i>
          Login with Google
        </button>
        <span>{<p>failed error:-</p> && error}</span>
        <p className="have-account">
          No account?{" "}
          <Link className="remove-link-decoration " to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
