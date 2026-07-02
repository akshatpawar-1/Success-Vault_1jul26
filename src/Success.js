import { useRef, useState, useEffect } from "react";
import db from "./Firebase";
import { set, ref, onValue, remove } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

function Success() {

    const rName = useRef();
    const rTitle = useRef();
    const rDesc = useRef();

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [msg, setMsg] = useState("");
    const [stories, setStories] = useState([]);
    const [editingId,setEditingId] = useState(null);

    const hName = (event) => { setName(event.target.value); }
    const hTitle = (event) => { setTitle(event.target.value); }
    const hDesc = (event) => { setDesc(event.target.value); }


    useEffect(() => {

    		// Go to the "success" folder in Firebase
    		let r = ref(db, "success");

    		// Read everything inside the "success" folder
    		onValue(r, (snapshot) => {
	
        	// Check if any data exists
        	if (snapshot.exists()) {

            		// Get all the data from Firebase
            		let data = snapshot.val();

            		// Create an empty array
            		let arr = [];

            		// Visit every story one by one
            		for (let key in data) {

                		let story = {
                    			id: key,
                    			name: data[key].name,
                    			title: data[key].title,
                    			desc: data[key].desc
                		};

                	// Put this story into the array
                	arr.push(story);

            	}

            	// Save the complete array into React state
            	setStories(arr);

        	}
        	else {

            		// No stories found
            		setStories([]);

        	}

    	});

    }, []);


    const delStory = (id) => {

	let ans = window.confirm("Delete this story?");

    	if(ans){

        	let r = ref(db, "success/" + id);

        	remove(r);
        	toast.success("Story Deleted!", { autoClose: 2000 });

    	}

    }

    const editStory = (story) => {

    	setName(story.name);
    	setTitle(story.title);
    	setDesc(story.desc);

    	setEditingId(story.id);

   	rName.current.focus();

    }	

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


		<h2>Success Stories</h2>
		<div className="stories">
		{
    			stories.map((story) => (

        		<div key={story.id} className="story">

            			<h3>{story.title}</h3>
            			<p><b>Name:</b> {story.name}</p>
            			<p>{story.desc}</p>

				<div className="btn-row">

					<button
    						className="btn btn-delete"
    						onClick={() => delStory(story.id)}
					>Delete
					</button>

					<button
    						className="btn btn-edit"
    						onClick={() => editStory(story)}
					>Edit
					</button>

				</div>

        		</div>

    			))
		}
		</div>

            </div>

        </>
    );

}
export default Success;