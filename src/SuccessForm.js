import { useRef, useState } from "react";
import db from "./Firebase";
import { set, ref } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";


function SuccessForm(props) {

    const rName = useRef();
    const rTitle = useRef();
    const rDesc = useRef();

    const [msg, setMsg] = useState("");
    const {name, setName, title, setTitle, desc, setDesc, editingId, setEditingId} = props;

    const hName = (event) => { setName(event.target.value); }
    const hTitle = (event) => { setTitle(event.target.value); }
    const hDesc = (event) => { setDesc(event.target.value); }


    const save = (event) => {

        event.preventDefault();

        if (name.trim() === "") {
            toast.error("Please Enter Name", { autoClose: 2000 });
	    setMsg("");
            rName.current.focus();
            return;
        }

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

        let data = {name,title,desc};

	if(editingId==null)
	{
        	let node = name + "--" + new Date().getTime();

		//pointer to address that location
        	let r = ref(db, "success/" + node);

		//Take the data object and store it at the location pointed to by r
        	set(r, data);

        	setMsg("✅ Success Story Saved!");
		setEditingId(null);
	}
	else
	{
		let r = ref(db,"success/"+editingId);

    		set(r,data);

    		setMsg("✅ Story Updated!");

    		setEditingId(null);
		
	}

        setName("");
        setTitle("");
        setDesc("");

        rName.current.focus();

    }

    return (
        <>

            <ToastContainer />

            <div className="fc">

                <form onSubmit={save}>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        ref={rName}
                        value={name}
                        onChange={hName}
                    />

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

                </form>

                <br />

                <h2>{msg}</h2>

            </div>

        </>
    );

}
export default SuccessForm;