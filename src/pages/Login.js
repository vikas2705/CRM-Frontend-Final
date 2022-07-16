import React, { useState } from "react";
import "../styles/login.css";
import spinner from "../assets/spinnerwheel.gif";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const navigate = useNavigate();

    const showHideLoader = () => {
        setShowLoader(true);

        setTimeout(() => {
            setShowLoader(false);
        }, 5000);
    };

    const handleLoginSubmit = (data, event) => {
        console.log(data);
        showHideLoader();
        navigate("/admin");
        // make an api call -->  loginUser(data)
        // redirect to different page on success
        //alert("login successful");
        event.preventDefault();
    };

    const handleSignupSubmit = (data, event) => {
        console.log(data);
        showHideLoader();
        navigate("/customer");
        // make an api call -->  loginUser(data)
        // redirect to different page on success
        //alert("login successful");
        event.preventDefault();
    };

    return (
        <div className='bg-primary d-flex justify-content-center align-items-center vh-100'>
            {!showSignupForm && (
                <Signin
                    onSubmit={handleLoginSubmit}
                    setShowSignupForm={setShowSignupForm}
                />
            )}
            {showSignupForm && (
                <Signup
                    onSubmit={handleSignupSubmit}
                    setShowSignupForm={setShowSignupForm}
                />
            )}
            {showLoader && (
                <div className='loader'>
                    <img src={spinner} alt='loader' />
                </div>
            )}
        </div>
    );
};

export default Login;
