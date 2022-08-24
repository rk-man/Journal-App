import { useNavigate } from "react-router-dom";

function EachEntry({ entry }) {
    const navigate = useNavigate();

    const showSpecificEntry = (e) => {
        e.preventDefault();
        console.log(entry);
        navigate("/entry", { state: { ...entry } });
    };

    return (
        <div className="entry bg-indigo-500">
            <img src={entry.entryImagePath} />

            <div className="pt-8 pb-16 pl-8 pr-8">
                <p>
                    {new Date(entry.createdDate).toLocaleString("en-us", {
                        dateStyle: "long",
                        timeStyle: "short",
                    })}
                </p>
                <p className="mb-6 mt-1 bg-white w-fit px-2 py-0 text-indigo-500 rounded-md">
                    {entry.overview}
                </p>

                <p>
                    {entry.summary.length > 100
                        ? entry.summary.substr(0, 100)
                        : entry.summary}
                    ...
                </p>

                <button
                    onClick={showSpecificEntry}
                    className="bg-transparent hover:bg-white text-white-700 font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl mt-4 cursor-pointer"
                >
                    Read More
                </button>
            </div>
        </div>
    );
}

export default EachEntry;
