import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";

//components
import Header from "./components/Header";
import ProtectRoute from "./components/ProtectRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EntryPage from "./pages/EntryPage";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ProtectRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route path="/entry" element={<ProtectRoute />}>
                    <Route path="/entry" element={<EntryPage />} />
                </Route>

                <Route path="/my-account" element={<ProtectRoute />}>
                    <Route path="/my-account" element={<MyAccount />} />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
