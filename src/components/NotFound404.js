import React from "react";
import { useNavigate } from "react-router-dom";
import Image404 from "../assets/404.svg";

const NotFound404 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <section className='bg-light d-flex justify-content-center align-items-center text-center vh-100'>
            <div>
                <h1>Page not found</h1>
                <img src={Image404} alt='..' />
                <br />
                <br />
                <p>
                    The page that you are requesting is not available. Please
                    check ythe path
                </p>

                <button className='btn btn-primary' onClick={goBack}>
                    Go Back
                </button>
            </div>
        </section>
    );
};

export default NotFound404;
