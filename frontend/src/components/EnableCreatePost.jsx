import { useSelector } from "react-redux";
function EnableCreatePost({ setEntryEnabled }) {
    const { isLoading } = useSelector((state) => {
        return state.entry;
    });

    if (!isLoading)
        return (
            <div className="bg-indigo-500 max-w-120 h-40 mx-auto mt-16 flex items-center justify-center rounded-md">
                <button
                    onClick={() => {
                        setEntryEnabled(true);
                    }}
                    className="bg-transparent hover:bg-white text-white font-semibold hover:text-indigo-500 py-4 px-6 border border-white hover:border-transparent rounded text-3xl"
                >
                    Add Entry
                </button>
            </div>
        );
}

export default EnableCreatePost;
