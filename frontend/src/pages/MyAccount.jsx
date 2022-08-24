import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";

import {
    reset,
    updateUserMain,
    updateUserPass,
} from "./../features/auth/authSlice";
import { toast } from "react-toastify";

function MyAccount() {
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => {
            return state.auth;
        }
    );

    //sometimes the user data will not be available..in that case we should
    const [mainData, setMainData] = useState({
        email: user ? user.email : "",
        name: user ? user.name : "",
        profileImage: user ? user.profileImage : null,
    });

    const [passData, setPassData] = useState({
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (user && isSuccess) {
            toast.success("updated Successfully");
        } else if (isError && message) {
            toast.error(message);
        }
        dispatch(reset());
    }, [user, dispatch, isSuccess, isError, message]);

    const updateFieldValues = (e) => {
        setMainData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const updatePassValues = (e) => {
        setPassData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const handleMainSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserMain(mainData));
    };

    const handlePassSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserPass(passData));
        setPassData({
            oldPassword: "",
            newPassword: "",
            passwordConfirm: "",
        });
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (user) {
        return (
            <div className="flex flex-col justify-center items-center w-full py-16 gap-32">
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <h2>Edit your account here</h2>
                    <form className="bg-indigo-500" onSubmit={handleMainSubmit}>
                        <div className="flex justify-center items-center mb-4">
                            <img
                                className="w-20 h-20 rounded-full"
                                src={`/images/${mainData.profileImage}`}
                                alt="Rounded avatar"
                            />
                        </div>

                        <label htmlFor="name">Name</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                            id="name"
                            type="text"
                            value={mainData.name}
                            onChange={updateFieldValues}
                            placeholder="Enter your name here..."
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-10"
                            id="email"
                            type="email"
                            value={mainData.email}
                            onChange={updateFieldValues}
                            placeholder="Enter your email here..."
                            required
                        />

                        <div className="flex justify-center gap-8">
                            <button
                                type="submit"
                                className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                            >
                                Save Changes
                            </button>
                            <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <h2>Change Your Password here</h2>
                    <form onSubmit={handlePassSubmit} className="bg-indigo-500">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                            id="oldPassword"
                            type="password"
                            placeholder="Enter your old password here..."
                            value={passData.oldPassword}
                            onChange={updatePassValues}
                            required
                        />

                        <label htmlFor="newPassword">New Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-6"
                            id="newPassword"
                            type="password"
                            placeholder="Enter your new password here..."
                            value={passData.newPassword}
                            onChange={updatePassValues}
                            required
                        />

                        <label htmlFor="passwordConfirm">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl mb-10"
                            id="passwordConfirm"
                            type="password"
                            placeholder="Confirm your password here..."
                            value={passData.passwordConfirm}
                            onChange={updatePassValues}
                            required
                        />

                        <div className="flex justify-center gap-8">
                            <button
                                type="submit"
                                className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                            >
                                Save Changes
                            </button>
                            <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MyAccount;
