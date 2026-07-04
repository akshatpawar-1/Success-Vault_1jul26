import { useState } from "react";

import SuccessForm from "./SuccessForm";
import SuccessList from "./SuccessList";

function Success() {

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editingId, setEditingId] = useState(null);

    return (
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
    );
}

export default Success;