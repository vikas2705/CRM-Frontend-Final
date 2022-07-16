import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = props => {
    const { onSubmit, setShowSignupForm } = props;
    /** state for login component*/
    const [userPassword, setUserPassword] = useState("");
    const [userId, setUserId] = useState("");

    const handleChangeUserId = event => {
        const value = event.target.value;
        setUserId(value);
    };

    const handleChangeUserPassword = event => {
        const value = event.target.value;
        setUserPassword(value);
    };

    const handleLoginSubmit = event => {
        const data = {
            userId: userId,
            password: userPassword,
        };
        onSubmit(data, event);
    };
    /** state for login component */

    return (
        <div className='card card-signin m-5 p-5'>
            <h1> Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <input
                        type='text'
                        placeholder='Enter UserId'
                        value={userId}
                        onChange={handleChangeUserId}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Enter user password'
                        value={userPassword}
                        onChange={handleChangeUserPassword}
                    />
                </div>
                <div>
                    <input type='submit' value='Log In' />

                    <Link to='/engineer'>Go to Engineer</Link>
                </div>
                <div>
                    <span>
                        Don't have an account?
                        <a
                            href='#'
                            onClick={() => {
                                setShowSignupForm(true);
                            }}
                        >
                            Signup!
                        </a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signin;
