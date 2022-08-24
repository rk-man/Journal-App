import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "./../features/auth/authSlice";

import { toast } from "react-toastify";

function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => {
        return state.auth;
    });

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        toast.success("Logged out successfully");
    };

    return (
        <header className="flex justify-between bg-indigo-500 items-center">
            <Link to="/">
                <h3 className="header-title">Dumb Here!</h3>
            </Link>

            {user && (
                <div className="header-btns flex gap-8">
                    <Link to="/my-account">
                        <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl">
                            account
                        </button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                    >
                        logout
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
