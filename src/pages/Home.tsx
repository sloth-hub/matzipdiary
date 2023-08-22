import React, { useEffect, useState } from "react";
import { db, firebaseAuth } from "../Firebase";
import { Notes } from "../Components/Notes";
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

    const logout = () => {
        firebaseAuth.signOut()
            .then(() => {
                window.location.reload();
            }).catch(err => {
                console.log(`${err.code} - ${err.message}`);
            });
    }



    return (
        <>
            <h1>home page</h1>
            <p>{userObj ? `Hello, ${userObj.nickname}!` : "goodbye!"}</p>
            <button onClick={logout}>로그아웃</button>
            <Link to="/write">일기쓰기</Link>
            <div className="notes">
                {notes.map((note, index) =>
                    <Notes key={index} note={note} />
                )}
            </div>
        </>
    )
}