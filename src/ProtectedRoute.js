import { Navigate } from "react-router-dom";
import { auth } from "./Firebase";

function ProtectedRoute({ children }) {

    if (auth.currentUser == null)
        return <Navigate to="/login" replace />;

    return children;
}

export default ProtectedRoute;