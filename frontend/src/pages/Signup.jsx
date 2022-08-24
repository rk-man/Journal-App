import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "./../features/auth/authSlice";

import { toast } from "react-toastify";

function Signup() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const { email, name, password, passwordConfirm } = userData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isSuccess, isError, message, isLoading } = useSelector(
        (state) => {
            return state.auth;
        }
    );

    useEffect(() => {
        if (user && isSuccess) {
            toast.success("Signed in successfully");
            navigate("/");
        } else if (isError && message) {
            toast.error(message);
        }

        if ((user && isSuccess) || (isError && message)) {
            dispatch(reset());
        }
        // eslint-disable-next-line
    }, [user, isError, isSuccess, dispatch, navigate, message]);

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
        dispatch(signup(userData));
    };

    return !isLoading ? (
        <div className="form-container">
            <h2>Sign up here to get started</h2>
            <form className="bg-indigo-500" onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                    id="name"
                    type="text"
                    placeholder="Enter your name here..."
                    onChange={updateFieldValues}
                    value={name}
                    required
                />

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
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                    id="password"
                    type="password"
                    placeholder="Enter your password here..."
                    onChange={updateFieldValues}
                    value={password}
                    required
                />

                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-10"
                    id="passwordConfirm"
                    type="password"
                    placeholder="Confirm your password here..."
                    onChange={updateFieldValues}
                    value={passwordConfirm}
                    required
                />

                <div className="flex justify-center gap-8">
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                    >
                        Signup
                    </button>
                    <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl">
                        cancel
                    </button>
                </div>

                <p className="text-center mt-4">
                    Existing User ?{" "}
                    <Link to="/login">
                        <span style={{ color: "#08F7BA" }}>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    ) : (
        <h1>Loading...</h1>
    );
}

export default Signup;
