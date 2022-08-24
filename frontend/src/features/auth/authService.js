import axios from "axios";
const authURL = "api/v1/users";

export const signupFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/signup`, userData);

    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));

    return response.data;
};

export const loginFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/login`, userData);

    console.log(response.data.data.user);

    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));

    return response.data;
};

export const logoutFromBackend = async (userData) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export const updateUserMainFromBackend = async (token, userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(
        `${authURL}/my-account/update-main`,
        userData,
        config
    );

    console.log(response.data.data.user);

    localStorage.setItem("user", JSON.stringify(response.data.data.user));

    return response.data;
};

export const updateUserPassFromBackend = async (token, passData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(
        `${authURL}/my-account/update-pass`,
        passData,
        config
    );

    console.log(response.data.data.user);

    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));

    return response.data;
};
