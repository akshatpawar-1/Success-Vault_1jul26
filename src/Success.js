import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SuccessForm from "./SuccessForm";
import SuccessList from "./SuccessList";

function Success() {

    const nav = useNavigate();

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

    	const unsub = onAuthStateChanged(auth, (user) => {
		console.log(user);

        	if (user == null)
            		nav("/login");

    	});

    	return () => unsub();

    }, []);

    return (
        <>
	<div className="success-page">
            <h1>Success Vault</h1>

            <SuccessForm
                name={name}
                setName={setName}
                title={title}
                setTitle={setTitle}
                desc={desc}
                setDesc={setDesc}
                editingId={editingId}
                setEditingId={setEditingId}
            />

            <SuccessList
                setName={setName}
                setTitle={setTitle}
                setDesc={setDesc}
                setEditingId={setEditingId}
            />
	</div>
        </>
    );
}
export default Success;