import axios from "axios";

const BASE_URL = "https://relevel-crm--backend.herokuapp.com";

// login
export const newUserSignin = async data => {
    const postUrl = `${BASE_URL}/crm/api/v1/auth/signin`;
    return await axios.post(postUrl, data);
};

// signup
export const newUserSignup = async data => {
    const postUrl = `${BASE_URL}/crm/api/v1/auth/signup`;
    return await axios.post(postUrl, data);
};
