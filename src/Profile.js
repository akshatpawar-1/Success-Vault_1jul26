import db, { auth } from "./Firebase";
import { ref, set, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

function Profile() {

    const rName = useRef();
    const nav = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {

        if(auth.currentUser == null)
            return;

        const uid = auth.currentUser.uid;

        let r = ref(db, "profile/" + uid);

        get(r)
        .then((snapshot) => {

            if(snapshot.exists()) {
		
		setAlreadyExists(true);
                setDisplayName(snapshot.val().displayName);

            }
	    setLoadingProfile(false);

        });

    }, []);

    const hName = (event) => {
        setDisplayName(event.target.value);
    }

    const save = (event) => {

        event.preventDefault();

        if(displayName.trim() === "") {

            toast.error("Enter Display Name");
            rName.current.focus();
            return;

        }

        const uid = auth.currentUser.uid;

        let r = ref(db, "profile/" + uid);

        get(r)
        .then(() => {

            const data = {displayName: displayName};

            set(r, data)
            .then(() => {

                if(alreadyExists){
                    toast.success("Display Name Changed!");
		    nav("/success");
		}
                else{
                    toast.success("Profile Saved!");
                    nav("/success");
		}

            })
            .catch((err) => {

                toast.error(err.message);

            });

        });

    }

    if (loadingProfile)
    	return null;
    return(
        <>

            <div className="fc">

                <h1>My Profile</h1>

                <form onSubmit={save}>

                    <input
                        type="text"
                        placeholder="Enter Display Name"
                        ref={rName}
                        value={displayName}
                        onChange={hName}
                    />

                    <input
                        type="submit"
                        value={alreadyExists ? "Edit" : "Save"}
                        className="btn"
                    />

                </form>

            </div>
		<p style={{ textAlign: "center", marginTop: "15px", fontSize: "15px" }}>
    		<b>Note :</b> Display Name will appear on your downloaded PDF
		</p> 
        </>
    );
}
export default Profile;