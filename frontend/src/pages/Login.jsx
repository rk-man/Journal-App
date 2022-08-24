import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "./../features/auth/authSlice";

import { toast } from "react-toastify";

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = userData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isSuccess, isError, message } = useSelector((state) => {
        return state.auth;
    });

    useEffect(() => {
        if (user && isSuccess) {
            toast.success("logged in successfully");
            navigate("/");
        } else if (isError) {
            toast.error(message);
        }

        if ((user && isSuccess) || (isError && message)) {
            dispatch(reset());
        }
    }, [user, isError, message, isSuccess, dispatch, navigate]);

    const updateFieldValues = (e) => {
        setUserData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    return (
        <div className="form-container">
            <h2>Login to continue</h2>
            <form onSubmit={onSubmit} className="bg-indigo-500">
                <label htmlFor="email">Email</label>
                <input
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                    id="email"
                    type="email"
                    placeholder="Enter your email here..."
                    onChange={updateFieldValues}
                    value={email}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-10"
                    id="password"
                    type="password"
                    placeholder="Enter your password here..."
                    onChange={updateFieldValues}
                    value={password}
                    required
                />

                <div className="flex justify-center gap-8">
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                    >
                        login
                    </button>
                    <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl">
                        cancel
                    </button>
                </div>

                <p className="text-center mt-4">
                    New User ?{" "}
                    <Link to="/signup">
                        <span style={{ color: "#08F7BA" }}>Sign in</span>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
