import { useRef, useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Signup() {

    const rEmail = useRef();
    const rPassword = useRef();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        .then((res) => {

            toast.success("Account Created!");

	    setTimeout(() => {
        	nav("/login");
    	    }, 1500);

        })
        .catch((err) => {

            toast.error(err.message);

        });

    }

    return (
        <>
	<div className="fc">
            <h1>Signup</h1>

            <ToastContainer />

            <form onSubmit={signup}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    ref={rEmail}
                    value={email}
                    onChange={hEmail}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    ref={rPassword}
                    value={password}
                    onChange={hPassword}
                />

                <br /><br />

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