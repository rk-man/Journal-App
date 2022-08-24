import EachEntry from "./EachEntry";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
    reset,
    getUserEntries,
    resetEntries,
} from "./../features/entry/entrySlice";

function UserEntries() {
    const { entries, isLoading, entry } = useSelector((state) => {
        return state.entry;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserEntries());

        return () => {
            dispatch(resetEntries());

            dispatch(reset());
        };
    }, [dispatch, entry]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return entries.length > 0 ? (
        <div className="user-entries">
            {entries.map((entry) => {
                return <EachEntry key={entry._id} entry={entry} />;
            })}
        </div>
    ) : (
        <h1 className="text-center">No entries so far</h1>
    );
}

export default UserEntries;
