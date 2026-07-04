import { useRef, useState } from "react";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {

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

    const login = (event) => {

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

    		signInWithEmailAndPassword(auth, email, password)
    		.then((res) => {

        		toast.success("Login Successful!");

			setTimeout(() => {
                		nav("/success");
            		}, 1500);

    		})
    		.catch((err) => {

        		 toast.error(err.message);

    		});

    }

    return (
        <>
	<div className="fc">
            <h1>Login</h1>
	    <ToastContainer />

            <form onSubmit={login}>

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
                    value="Login"
                    className="btn"
                />

            </form>
	</div>
        </>
    );
}
export default Login;