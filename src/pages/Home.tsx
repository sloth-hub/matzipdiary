import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Note } from "../Components/Note";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NoteInterface } from "../interfaces/note.interface";
import { Link } from "react-router-dom";
import { PiWarningFill } from "react-icons/pi";

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

    const changeStyle = (e: React.MouseEvent) => {
        const target = e.target;
        (target as HTMLElement).innerText = "일기쓰기";
        (target as HTMLElement).classList.add("active");
    }

    const removeStyle = (e:React.MouseEvent) => {
        const target = e.target;
        (target as HTMLElement).innerText = "+";
        (target as HTMLElement).classList.remove("active");
    }

    return (
        <>
            <div className="notes">
                {notes.length > 0 ?
                    notes.map((note, index) =>
                        <Note key={index} note={note} />
                    )
                    :
                    <div className="warn">
                        <PiWarningFill size={"2em"} />
                        <p>일기가 없습니다.<br /> 우측 하단의 버튼을 눌러 일기를 써보세요!</p>
                    </div>
                }
            </div>
            <Link to="/write" className="write-btn" onMouseOver={changeStyle} onMouseOut={removeStyle}>+</Link>
        </>
    )
}