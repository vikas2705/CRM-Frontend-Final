import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Signup = props => {
    const { onSubmit, setShowSignupForm } = props;
    /** State for sign up component*/
    const [signupPassword, setSignupPassword] = useState("");
    const [signupUserName, setSignupUserName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupUserId, setSignupUserId] = useState("");
    const [signupUserType, setSignupUserType] = useState("CUSTOMER");

    const handleSelectuserType = val => {
        setSignupUserType(val);
    };

    const handleSignupUserIdChange = event => {
        const value = event.target.value;
        setSignupUserId(value);
    };
    const handleSignupUserPaswordChange = event => {
        const value = event.target.value;
        setSignupPassword(value);
    };
    const handleSignupUserNameChange = event => {
        const value = event.target.value;
        setSignupUserName(value);
    };
    const handleSignupUserEmailChange = event => {
        const value = event.target.value;
        setSignupEmail(value);
    };

    const handleSignupSubmit = event => {
        const data = {
            userId: signupUserId,
            password: signupPassword,
            email: signupEmail,
            userName: signupUserName,
            userType: signupUserType,
        };
        onSubmit(data, event);
    };
    /** State for sign up component */

    return (
        <div className='card card-signup m-5 p-5'>
            <h1>Register</h1>

            <form onSubmit={handleSignupSubmit}>
                <div>
                    <input
                        type='text'
                        placeholder='Enter UserId'
                        value={signupUserId}
                        onChange={handleSignupUserIdChange}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Enter password'
                        value={signupPassword}
                        onChange={handleSignupUserPaswordChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Enter user name'
                        value={signupUserName}
                        onChange={handleSignupUserNameChange}
                    />
                </div>
                <div>
                    <input
                        type='email'
                        placeholder='Enter User Email'
                        value={signupEmail}
                        onChange={handleSignupUserEmailChange}
                    />
                </div>

                <div>
                    <label>User Type: </label>
                    <div className='col'>
                        <DropdownButton
                            align='end'
                            title={signupUserType}
                            id='userType'
                            onSelect={handleSelectuserType}
                            variant='light'
                        >
                            <Dropdown.Item eventKey='CUSTOMER'>
                                CUSTOMER
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='ENGINEER'>
                                ENGINEER
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>

                <div>
                    <input type='submit' value='Register' />
                </div>
            </form>
            <div>
                <span>
                    Already have an account?
                    <a
                        href='#'
                        onClick={() => {
                            setShowSignupForm(false);
                        }}
                    >
                        Login!
                    </a>
                </span>
            </div>
        </div>
    );
};

export default Signup;
