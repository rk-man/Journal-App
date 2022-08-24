import CreatePost from "../components/CreatePost";
import UserEntries from "../components/UserEntries";
import EnableCreatePost from "../components/EnableCreatePost";

import { useState } from "react";
import { useEffect } from "react";

function Home() {
    const [entryEnabled, setEntryEnabled] = useState(false);

   

    return (
        <main>
            {entryEnabled ? (
                <CreatePost setEntryEnabled={setEntryEnabled} />
            ) : (
                <EnableCreatePost setEntryEnabled={setEntryEnabled} />
            )}
            <UserEntries />
        </main>
    );
}

export default Home;
