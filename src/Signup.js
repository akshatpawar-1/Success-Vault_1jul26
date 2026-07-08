import { useRef, useState, useEffect } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
    const rEmail = useRef();
    const rPassword = useRef();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(true);

    // If someone is already logged in and manually types /signup,
    // send them away instead of showing the form.
    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser != null) {
                nav("/success", { replace: true });
            } else {
                setCheckingAuth(false);
            }

        });

        return () => unsub();

    }, []);

    const hEmail = (event) => {
        setEmail(event.target.value);
    }
    const hPassword = (event) => {
        setPassword(event.target.value);
    }
    const signup = (event) => {
        event.preventDefault();
        if (email.trim() === "") {
            toast.error("Enter Email");
            rEmail.current.focus();
            return;
        }
        if (password.trim() === "") {
            toast.error("Enter Password");
            rPassword.current.focus();
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
    		toast.success("Account Created!", { autoClose:1500 });
		await signOut(auth);	
	
       		nav("/login", { replace: true });
	})
        .catch((err) => {
            toast.error(err.message);
        });
    }

    if (checkingAuth)
        return null;

    return (
        <>
	<div className="fc">
            <h1>Signup</h1>
            <form onSubmit={signup}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    ref={rEmail}
                    value={email}
                    onChange={hEmail}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    ref={rPassword}
                    value={password}
                    onChange={hPassword}
                />
                <input
                    type="submit"
                    value="Signup"
                    className="btn"
                />
            </form>
	</div>
        </>
    );
}
export default Signup;