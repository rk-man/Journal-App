import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../custom-hooks/useAuthStatus";

function ProtectRoute() {
    const { checkingStatus, loggedIn } = useAuthStatus();

    if (checkingStatus) {
        return <h1>Loading...</h1>;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectRoute;
