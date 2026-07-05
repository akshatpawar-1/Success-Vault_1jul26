import { useRef, useState, useEffect } from "react";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import db from "./Firebase";
import { ref, get } from "firebase/database";

function Login() {

    const rEmail = useRef();
    const rPassword = useRef();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(true);

    // If someone is already logged in and manually types /login,
    // send them to /success instead of showing the form.
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

			const uid = res.user.uid;

			let r = ref(db, "profile/" + uid);

			get(r)
			.then((snapshot) => {

        			if(snapshot.exists()){
					toast.success("Login Successful!",{autoClose:1500});
            				nav("/success");
				}
        			else{
            				nav("/profile");
				}
			})
			.catch((err) => {

				toast.error("Login succeeded but profile check failed: " + err.message);

			});

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
            <h1>Login</h1>

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