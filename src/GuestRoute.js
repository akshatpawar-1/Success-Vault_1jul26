import { Navigate } from "react-router-dom";
import { auth } from "./Firebase";

function GuestRoute({ children }) {

    if (auth.currentUser != null)
        return <Navigate to="/success" replace />;

    return children;
}
export default GuestRoute;