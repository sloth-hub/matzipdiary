import React from "react";
import { Note } from "../Components/Note";
import { NoteInterface } from "../interfaces/note.interface";
import { Link } from "react-router-dom";
import { PiWarningFill } from "react-icons/pi";
import { BiEditAlt } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";

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

    const selectedToggle = () => {
        const sort = document.querySelector(".sort");
        sort!.classList.toggle("active");
    }

    const selectedHover = () => {
        const sort = document.querySelector(".sort");
        sort!.classList.remove("active");
    }

    return (
        <>
            {isLoading ? <div className="loader">Loading...</div>
                :
                <>
                    <div className="search">
                        <ul className="category">
                            <li>한식</li>
                            <li>양식</li>
                            <li>중식</li>
                            <li>일식</li>
                            <li>아시아/퓨전</li>
                            <li>카페</li>
                            <li>기타</li>
                        </ul>
                        <div className="select-box" onMouseLeave={selectedHover}>
                            <div className="selected">
                                <button type="button" name="foodCategory" className="selected-value" onClick={selectedToggle}>
                                </button>
                                <div className="arrow" onClick={selectedToggle}><RiArrowDownSLine size={"1.5em"} /></div>
                            </div>
                            <div className="sort">
                                <button type="button">방문일 오름차순</button>
                                <button type="button">방문일 내림차순</button>
                                <button type="button">글등록일 오름차순</button>
                                <button type="button">글등록일 내림차순</button>
                            </div>
                        </div>
                    </div>
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