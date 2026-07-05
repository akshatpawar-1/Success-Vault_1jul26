import { useRef, useState, useEffect } from "react";
import db from "./Firebase";
import { set, ref, get, push } from "firebase/database";
import { toast } from "react-toastify";
import { auth } from "./Firebase";


function SuccessForm(props) {

    const rTitle = useRef();
    const rDesc = useRef();

    const [msg, setMsg] = useState("");
    const [displayName, setDisplayName] = useState("");
    const {title, setTitle, desc, setDesc, editingId, setEditingId} = props;

    const hTitle = (event) => { setTitle(event.target.value); }
    const hDesc = (event) => { setDesc(event.target.value); }

    useEffect(() => {

        if(auth.currentUser == null)
        	return;

    	const uid = auth.currentUser.uid;
    	let r = ref(db, "profile/" + uid);

    	get(r)
    	.then((snapshot) => {

        	if(snapshot.exists()) {
            		setDisplayName(snapshot.val().displayName);
        	}

    	});

    }, []);


    const reset=()=>{
		setTitle("");
		setDesc("");
		setMsg("");
		setEditingId(null);	
	
		rTitle.current.focus();
	}

    const save = async (event) => {

        event.preventDefault();

        if (title.trim() === "") {
            toast.error("Please Enter Success Title", { autoClose: 2000 });
	    setMsg("");
            rTitle.current.focus();
            return;
        }

        if (desc.trim() === "") {
            toast.error("Please Enter Description", { autoClose: 2000 });
	    setMsg("");
            rDesc.current.focus();
            return;
        }
	
	const uid = auth.currentUser.uid;
        const data = {title,desc};

	try {

		if(editingId==null)
		{
			// Use push() to generate a safe, unique key instead of building
			// one from displayName - display names can contain characters
			// ('.', '#', '$', '[', ']', '/') that Firebase Realtime Database
			// keys are not allowed to contain, which silently breaks the write.
			let listRef = ref(db, "success/" + uid);
			let newRef = push(listRef);

			await set(newRef, data);

			setMsg("✅ Success Story Saved!");
			setEditingId(null);
		}
		else
		{
			let r = ref(db,"success/"+uid+"/"+editingId);

			await set(r,data);

			setMsg("✅ Story Updated!");

			setEditingId(null);
		}

		setTitle("");
		setDesc("");

		rTitle.current.focus();

	} catch (err) {

		// Previously write failures were silent - the "Saved!" message
		// showed even when the database rejected the write.
		toast.error("Save failed: " + err.message);
		setMsg("");

	}

    }

    return (
        <>

            <div className="fc">

                <form onSubmit={save}>

                    <input
                        type="text"
                        placeholder="Enter Success Title"
                        ref={rTitle}
                        value={title}
                        onChange={hTitle}
                    />

                    <textarea
                        placeholder="Enter Description"
                        rows="4"
                        cols="30"
                        ref={rDesc}
                        value={desc}
                        onChange={hDesc}
                    >
                    </textarea>

                    <input
                        type="submit"
                        className="btn"
                        value={editingId==null ? "Save Story" : "Update Story"}
                    />
		
		    <input 
			type="button"
			className="btn"	
			value="Reset" 
			onClick={reset}
		    />

                </form>

                <br />

                <h2>{msg}</h2>

            </div>

        </>
    );

}
export default SuccessForm;