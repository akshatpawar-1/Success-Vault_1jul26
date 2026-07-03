import { useState, useEffect } from "react";
import db from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { toast } from "react-toastify";

function SuccessList(props) {

    const [stories, setStories] = useState([]);
    const {setName, setTitle, setDesc, setEditingId} = props;

    useEffect(() => {

        let r = ref(db, "success");

        onValue(r, (snapshot) => {

            if (snapshot.exists()) {

                let data = snapshot.val();
                let arr = [];

                for (let key in data) {

                    let story = {
                        id: key,
                        name: data[key].name,
                        title: data[key].title,
                        desc: data[key].desc
                    };

                    arr.push(story);
                }

                setStories(arr);

            }
            else {
                setStories([]);
            }

        });

    }, []);

    const delStory = (id) => {

        let ans = window.confirm("Delete this story?");

        if (ans) {

            let r = ref(db, "success/" + id);

            remove(r);

            toast.success("Story Deleted!", { autoClose: 2000 });

        }

    };

    const editStory = (story) => {

        setName(story.name);
    	setTitle(story.title);
    	setDesc(story.desc);

    	setEditingId(story.id);

    };

    return (
        <>

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
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-edit"
                                    onClick={() => editStory(story)}
                                >
                                    Edit
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

        </>
    );

}
export default SuccessList;