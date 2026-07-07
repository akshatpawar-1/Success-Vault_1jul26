import { useState, useEffect } from "react";
import db from "./Firebase";
import { get, ref, onValue, remove } from "firebase/database";
import { toast } from "react-toastify";
import { auth } from "./Firebase";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import QRCode from "qrcode";

function SuccessList(props) {

    const [stories, setStories] = useState([]);
    const {setTitle, setDesc, setEditingId} = props;
    const uid = auth.currentUser.uid;

    useEffect(() => {

        let r = ref(db, "success/"+uid);

        // onValue returns an unsubscribe function - keep it and call it
        // on unmount, otherwise the listener keeps running after you
        // leave the page (leaks + can stack up duplicates over time).
        const unsubscribe = onValue(r, (snapshot) => {

            if (snapshot.exists()) {

                let data = snapshot.val();
                let arr = [];

                for (let key in data) {

                    let story = {
                        id: key,
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

        }, (error) => {

            // Without this, a failed read (e.g. permission-denied) fails
            // completely silently and the list just looks empty forever.
            toast.error("Failed to load stories: " + error.message);

        });

        return () => unsubscribe();

    }, [uid]);

    const delStory = (id) => {

        let ans = window.confirm("Delete this story?");

        if (ans) {

            let r = ref(db, "success/" +uid+"/"+ id);

            remove(r)
            .then(() => {

                toast.success("Story Deleted!", { autoClose: 2000 });

            })
            .catch((err) => {

                toast.error("Delete failed: " + err.message);

            });

        }

    };

    const editStory = (story) => {

    	setTitle(story.title);
    	setDesc(story.desc);

    	setEditingId(story.id);

    };

    const downloadVault = async () => {

	if (stories.length === 0) {
		toast.error("Add at least one story before downloading.");
		return;
	}

	try {

		const uid = auth.currentUser.uid;

		let displayName = "User";

		let profileRef = ref(db, "profile/" + uid);

		let snapshot = await get(profileRef);

		if (snapshot.exists()) {
			displayName = snapshot.val().displayName;
		}

		const doc = new jsPDF();

		doc.setFontSize(20);
		doc.text("Success Stories", 105, 20, { align: "center" });

		doc.setFontSize(14);
		doc.text("By " + displayName, 105, 30, { align: "center" });

		doc.line(15, 35, 195, 35);

		let rows = [];

		stories.forEach((story, index) => {

			rows.push([
				index + 1,
				story.title,
				story.desc
			]);

		});

		autoTable(doc, {

			startY: 40,

			head: [["#", "Title", "Description"]],

			body: rows,
		
			headStyles: {
        			fillColor: [198, 239, 206],
        			textColor: [0, 0, 0],       // black text
        			fontStyle: "bold"
    			}

		});

		const finalY = doc.lastAutoTable.finalY;

		doc.setFontSize(11);

		doc.text(
			"Generated On : " + new Date().toLocaleDateString(),
			14,
			finalY + 10
		);

		const qrText =`https://success-vault-1jul26.web.app/`;

		doc.setFontSize(10);
		doc.text("Scan QR to visit", 177.5, finalY + 15, { align: "center" });
		doc.text("Success Vault App", 177.5, finalY + 19, { align: "center" });
		const qrImage = await QRCode.toDataURL(qrText);

		doc.addImage(
			qrImage,
			"PNG",
			160,
			finalY + 20,
			35,
			35
		);

		const pages = doc.getNumberOfPages();
		for (let i = 1; i <= pages; i++) {

			doc.setPage(i);
			doc.setFontSize(10);

			doc.text(
				`Page ${i} of ${pages}`,
				105,
				290,
				{ align: "center" }
			);

		}

		const blob = doc.output("blob");
		saveAs(blob,`${displayName}-Success-Vault.pdf`);

	} catch (err) {

		// Previously a failed PDF (bad profile read, QR code failure, etc.)
		// would fail with no feedback at all.
		toast.error("Download failed: " + err.message);

	}

    };

    return (
        <>

            <h2>My Success Stories</h2>
	<div className="stories-container">

            <div className="stories">

                {
                    stories.length === 0 &&
                    <div className="empty-state">
                        <p>No success stories yet.</p>
                        <p>Start by adding your first achievement!</p>
                    </div>
                }

                {
                    stories.map((story) => (

                        <div key={story.id} className="story">

                            <h3>{story.title}</h3>

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
		{
    			stories.length > 0 &&
    			<button
        			className="download-btn"
        			onClick={downloadVault}
    			>Download PDF
    			</button>
		}
	</div>

        </>
    );

}
export default SuccessList;