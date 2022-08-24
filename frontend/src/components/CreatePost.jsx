import FilePondUpload from "./FilePondUpload";

import { useDispatch } from "react-redux";
import { useState } from "react";

import { addEntry } from "./../features/entry/entrySlice";
function CreatePost({ setEntryEnabled }) {
    const [entryData, setEntryData] = useState({
        summary: "",
        entryImage: null,
        overview: "Exciting",
    });

    const dispatch = useDispatch();

    //getting the file
    const getFile = (file) => {
        setEntryData((prev) => {
            return {
                ...prev,
                entryImage: file,
            };
        });

        console.log(file.data);
    };

    const updateFieldValues = (e) => {
        setEntryData((prev) => {
            return {
                ...prev,
                [`${e.target.id}`]: e.target.value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (entryData.entryImage != null && entryData.summary.length > 10) {
            dispatch(addEntry(entryData));
        }
        setEntryEnabled(false);
    };

    return (
        <section className="bg-indigo-500">
            <div className="form-container form-container-main">
                <form onSubmit={onSubmit} className="form-add-entry">
                    <h3 className="text-center mb-6">
                        Upload your images here...
                    </h3>
                    <FilePondUpload getFile={getFile} />
                    <select
                        onChange={updateFieldValues}
                        id="overview"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-md focus:ring-blue-500 focus:border-blue-500 block w-2/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-auto ml-auto mb-16"
                    >
                        <option defaultValue={"How are you feeling ?"}>
                            How are you feeling ?
                        </option>
                        <option value="Excited">Excited</option>
                        <option value="Enlightened">Enlightened</option>
                        <option value="Anxious">Anxious</option>
                        <option value="Happy">Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Awesome">Awesome</option>
                    </select>
                    <div className="form-description">
                        <h3 className="text-center mb-6">Write your story</h3>
                        <textarea
                            id="summary"
                            rows="40"
                            className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-2xl mb-10"
                            placeholder="Your story..."
                            value={entryData.summary}
                            onChange={updateFieldValues}
                        />
                    </div>

                    <div className="flex justify-center gap-8">
                        <button
                            type="submit"
                            className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-4 px-6 border border-white hover:border-transparent rounded text-3xl"
                        >
                            Add Entry
                        </button>
                        <button className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-4 px-6 border border-white hover:border-transparent rounded text-3xl">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreatePost;
