import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Note } from "../Components/Note";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NoteInterface } from "../interfaces/note.interface";
import { Link } from "react-router-dom";

export const Home = ({ userObj }: any) => {

    const [notes, setNotes] = useState<NoteInterface[]>([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const q = query(
            collection(db, "notes"),
            where("uid", "==", userObj.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            return {
                ...doc.data()
            }
        });
        // @ts-ignore
        setNotes(data);
    }

    return (
        <>
            <div className="notes">
                {notes.map((note, index) =>
                    <Note key={index} note={note} />
                )}
            </div>
            <Link to="/write" className="write-btn">+</Link>
        </>
    )
}