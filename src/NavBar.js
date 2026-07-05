import { useState, useEffect } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {

    const [user, setUser] = useState(null);
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    	const unsub = onAuthStateChanged(auth, (currentUser) => {

        	setUser(currentUser);
		setLoading(false);

    	});

    	return () => unsub();

    }, []);

    const logout = () => {

	const ans = window.confirm("Are you sure you want to logout?");
    	if (!ans)
        	return;

    	signOut(auth)
    	.then(() => {

        	toast.success("Logged Out Successfully",{autoClose:1500});
        	nav("/");

    	})
    	.catch((err) => {

        	alert(err.message);

    	});

    };

    if (loading)
    	return null;
    return (

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

			<Link to="/profile">My Profile</Link>			

        		<button className="nav-link" onClick={logout}>Logout</button>
    		</>
	    }

    	    </nav>
    );
}
export default Navbar;