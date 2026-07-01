import { useRef, useState } from "react";
import db from "./Firebase";
import { set, ref } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

function Success() {

    const rName = useRef();
    const rTitle = useRef();
    const rDesc = useRef();

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [msg, setMsg] = useState("");

    const hName = (event) => { setName(event.target.value); }
    const hTitle = (event) => { setTitle(event.target.value); }
    const hDesc = (event) => { setDesc(event.target.value); }

    const save = (event) => {

        event.preventDefault();

        if (name.trim() === "") {
            toast.error("Please Enter Name", { autoClose: 2000 });
            rName.current.focus();
            return;
        }

        if (title.trim() === "") {
            toast.error("Please Enter Success Title", { autoClose: 2000 });
            rTitle.current.focus();
            return;
        }

        if (desc.trim() === "") {
            toast.error("Please Enter Description", { autoClose: 2000 });
            rDesc.current.focus();
            return;
        }

        let data = {name,title,desc};

        let node = name + "--" + new Date().getTime();

        let r = ref(db, "success/" + node);

        set(r, data);

        setMsg("✅ Success Story Saved!");

        setName("");
        setTitle("");
        setDesc("");

        rName.current.focus();

    }

    return (
        <>
            <h1>Success Vault</h1>

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
                    <br /><br />

                    <input
                        type="text"
                        placeholder="Enter Success Title"
                        ref={rTitle}
                        value={title}
                        onChange={hTitle}
                    />
                    <br /><br />

                    <textarea
                        placeholder="Enter Description"
                        rows="4"
                        cols="30"
                        ref={rDesc}
                        value={desc}
                        onChange={hDesc}
                    >
                    </textarea>

                    <br /><br />

                    <input
                        type="submit"
                        className="btn"
                        value="Save Story"
                    />

                </form>

                <br />

                <h2>{msg}</h2>

            </div>

        </>
    );

}
export default Success;