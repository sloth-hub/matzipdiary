import React from "react";
import { Note } from "../Components/Note";
import { NoteInterface } from "../interfaces/note.interface";
import { Link } from "react-router-dom";
import { PiWarningFill } from "react-icons/pi";
import { BiEditAlt } from "react-icons/bi";

type RouterType = {
    isLoading: boolean,
    notes: NoteInterface[]
}

export const Home = ({ notes, isLoading }: RouterType) => {
    
    const changeStyle = (e: React.MouseEvent) => {
        const target = e.currentTarget;
        const icon = document.querySelector(".write-icon");
        const text = document.querySelector(".write-btn .text");
        (icon as HTMLElement).style.display = "none";
        (text as HTMLElement).style.display = "block";
        (target as HTMLElement).classList.add("active");
    }

    const removeStyle = (e: React.MouseEvent) => {
        const target = e.currentTarget;
        const icon = document.querySelector(".write-icon");
        const text = document.querySelector(".write-btn .text");
        (icon as HTMLElement).style.display = "block";
        (text as HTMLElement).style.display = "none";
        (target as HTMLElement).classList.remove("active");
    }

    return (
        <>
            {isLoading ? <div className="loader">Loading...</div>
                :
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
                    <Link to="/write" className="write-btn" onMouseOver={changeStyle} onMouseOut={removeStyle}>
                        <BiEditAlt size={"1.4em"} className="write-icon" />
                        <span className="text">일기쓰기</span>
                    </Link>
                </>
            }
        </>
    )
}