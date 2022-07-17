import React, { useState, useEffect } from "react";
import "../styles/login.css";
import spinner from "../assets/spinnerwheel.gif";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";
import { newUserSignin, newUserSignup } from "../api/auth";
import { USER_ROLES } from "../constants/userRoles";

const Login = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            const userTypes = localStorage.getItem("userTypes");
            redirectToHomePage(userTypes);
        }
    }, []);

    const redirectToHomePage = userTypes => {
        if (userTypes === USER_ROLES.CUSTOMER) {
            navigate("/customer");
        } else if (userTypes === USER_ROLES.ENGINEER) {
            navigate("/engineer");
        } else {
            navigate("/admin");
        }
    };

    const showHideLoader = () => {
        setShowLoader(true);

        setTimeout(() => {
            setShowLoader(false);
        }, 5000);
    };

    const handleLoginSubmit = (data, event) => {
        showHideLoader();

        newUserSignin(data)
            .then(res => {
                if (res.status === 200) {
                    /**
                     * 1. We need to store the user information in thr browser
                     * 2. using localstorage
                     * 3. redirect to the correct page acc to usertype
                     * 4. handle for error failure cases
                     */
                    const {
                        accessToken,
                        email,
                        name,
                        userId,
                        userStatus,
                        userTypes,
                        message,
                    } = res.data;

                    if (message) {
                        alert(message);
                    } else {
                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("email", email);
                        localStorage.setItem("name", name);
                        localStorage.setItem("userId", userId);
                        localStorage.setItem("userStatus", userStatus);
                        localStorage.setItem("userTypes", userTypes);

                        redirectToHomePage(userTypes);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });

        event.preventDefault();
    };

    const handleSignupSubmit = (data, event) => {
        showHideLoader();
        newUserSignup(data)
            .then(res => {
                if (res.status === 201) {
                    setShowSignupForm(false);
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
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
