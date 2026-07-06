import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Success from "./Success";
import Profile from "./Profile";


function App() {

    return (
        <BrowserRouter>
		
	    <ToastContainer />
            <NavBar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />

                <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

                <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />

		<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route path="*" element={<Home />} />

            </Routes>

        </BrowserRouter>
    );
}
export default App;