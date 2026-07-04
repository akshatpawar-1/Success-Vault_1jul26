import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Success from "./Success";

function App() {

    return (
        <BrowserRouter>

            <NavBar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />

                <Route path="*" element={<Home />} />

            </Routes>

        </BrowserRouter>
    );
}
export default App;