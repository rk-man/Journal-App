import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

import {
    resetExceptEntry,
    updateSpecificEntry,
    getSpecificEntry,
} from "./../features/entry/entrySlice";

import FilePondUpload from "../components/FilePondUpload";

function EntryPage() {
    const { entry, isLoading, isSuccess } = useSelector((state) => {
        return state.entry;
    });
    const location = useLocation();
    const dispatch = useDispatch();
    const [specificEntry, setSpecificEntry] = useState(entry);

    //when there is nothing in the entry state variable, then use the exisiting state variable from the location.state
    //else when there is a state variable entry, then change it to that
    useEffect(() => {
        if (isSuccess && entry) {
            setSpecificEntry(entry);
        } else {
            dispatch(getSpecificEntry(location.state._id));
        }
        dispatch(resetExceptEntry());
    }, [dispatch, entry, isSuccess, location]);

    //getting the file
    const getFile = (file) => {
        setSpecificEntry((prev) => {
            return {
                ...prev,
                entryImage: file,
            };
        });
    };

    const updateFieldValues = (e) => {
        setSpecificEntry((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const updateEntry = (e) => {
        e.preventDefault();
        if (
            specificEntry.entryImage != null &&
            specificEntry.summary.length > 10
        ) {
            dispatch(updateSpecificEntry(specificEntry));
        }
    };

    if (isLoading || !specificEntry) {
        return <h1>Loading...</h1>;
    }

    if (specificEntry) {
        return (
            <div className="entry-page">
                <div className="form-description">
                    <img src={specificEntry.entryImagePath} alt="Entry" />
                    <h3 className="text-center mb-4">
                        Click below to replace image
                    </h3>

                    <FilePondUpload getFile={getFile} />
                    <div className="flex items-center justify-center m-auto gap-8">
                        <h3 className="text-center mb-4">
                            Feeling better now ?
                        </h3>
                        <select
                            onChange={updateFieldValues}
                            id="overview"
                            className="bg-indigo-500 border border-gray-300 text-white text-2xl rounded-md focus:bg-indigo-500 focus:border-white block w-2/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-white dark:focus:border-white mb-8 justify-self-start"
                            value={specificEntry.overview}
                        >
                            <option defaultValue="How are you feeling ?">
                                How are you feeling ?
                            </option>
                            <option value="Excited">Excited</option>
                            <option value="Enlightened">Enlightened</option>
                            <option value="Anxious">Anxious</option>
                            <option value="Happy">Happy</option>
                            <option value="Sad">Sad</option>
                            <option value="Awesome">Awesome</option>
                        </select>
                    </div>
                    <textarea
                        id="summary"
                        rows="40"
                        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-2xl mb-10"
                        placeholder="Your story..."
                        value={specificEntry.summary}
                        onChange={updateFieldValues}
                    />
                    <div className="flex justify-center">
                        <button
                            onClick={updateEntry}
                            className="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-4 px-6 border border-indigo-500 hover:border-transparent rounded text-3xl"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EntryPage;
