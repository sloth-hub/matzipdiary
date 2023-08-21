import React, { useEffect, useState } from "react";
import { db, firebaseAuth } from "../Firebase";
import { Notes } from "../Components/Notes";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Home = ({ userObj }: any) => {

    const [notes, setNotes] = useState([{}]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const q = query(
            collection(db, "notes"),
            where("uid", "==", userObj.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
            ...doc.data()
        }));
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
            <div className="notes">
                {notes.map((note, index) =>
                    <Notes key={index} note={note} />
                )}
            </div>
        </>
    )
}