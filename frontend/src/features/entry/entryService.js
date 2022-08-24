import axios from "axios";

const userEntryURL = "api/v1/users/entries";

export const addEntryFromBackend = async (token, entryData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.post(userEntryURL, entryData, config);
    console.log(res.data.data.entry);

    return res.data;
};

export const getUserEntriesFromBackend = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.get(userEntryURL, config);
    console.log(res.data.data);
    return res.data;
};

export const updateSpecificEntryFromBackend = async (
    token,
    entryData,
    entryId
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.patch(
        `${userEntryURL}/${entryId}`,
        entryData,
        config
    );
    console.log(res.data.data);
    return res.data;
};

export const getSpecificEntryFromBackend = async (token, entryId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.get(`${userEntryURL}/${entryId}`, config);
    console.log(res.data.data);
    return res.data;
};
