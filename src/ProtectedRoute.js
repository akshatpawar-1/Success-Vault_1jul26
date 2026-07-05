import { Navigate } from "react-router-dom";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
            setLoading(false);

        });

        return () => unsub();

    }, []);

    if (loading)
        return null;

    if (user == null)
        return <Navigate to="/login" replace />;

    return children;
}
export default ProtectedRoute;