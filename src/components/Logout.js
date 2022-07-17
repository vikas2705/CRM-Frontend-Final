import React from "react";
import { useNavigate } from "react-router-dom";
import { CNavItem } from "@coreui/react";

const Logout = () => {
    const navigate = useNavigate();

    const logoutFn = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div onClick={logoutFn}>
            <CNavItem href='/'>
                <i className='bi bi-box-arrow-left text-white m-2'></i>
                <div className='text-decoration-none text-white mx-3'>
                    Logout
                </div>
            </CNavItem>
        </div>
    );
};

export default Logout;
