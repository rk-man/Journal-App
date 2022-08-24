import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const { user, token } = useSelector((state) => {
        return state.auth;
    });

    useEffect(() => {
        if (user && token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [user, token, setCheckingStatus]);

    return { checkingStatus, loggedIn };
}

export default useAuthStatus;
