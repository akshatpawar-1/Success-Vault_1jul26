import { useState, useEffect } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const [user, setUser] = useState(null);
    const nav = useNavigate();

    useEffect(() => {

    	const unsub = onAuthStateChanged(auth, (currentUser) => {

        	setUser(currentUser);

    	});

    	return () => unsub();

    }, []);

    const logout = () => {

    	signOut(auth)
    	.then(() => {

        	alert("Logged Out Successfully");
        	nav("/");

    	})
    	.catch((err) => {

        	alert(err.message);

    	});

    };

    return (
        <>
            <nav className="navbar">

	    {
    		user == null ?

    		<>
        		<Link to="/">Home</Link>
        		<Link to="/login">Login</Link>
        		<Link to="/signup">Signup</Link>
    		</>

    		:

    		<>
        		<Link to="/">Home</Link>
        		<Link to="/success">Success Vault</Link>

        		<button className="nav-link" onClick={logout}>Logout</button>
    		</>
	    }

    	    </nav>
        </>
    );
}
export default Navbar;