import React, { useEffect, useState } from "react";
import { Note } from "../Components/Note";
import { NoteInterface } from "../interfaces/note.interface";
import { Link } from "react-router-dom";
import { PiWarningFill } from "react-icons/pi";
import { BiEditAlt } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";

type RouterType = {
    notes: NoteInterface[],
    ogNotes: NoteInterface[]
    isLoading: boolean,
    setNotes: (value: any) => void,
}

export const Home = ({ notes, ogNotes, setNotes, isLoading }: RouterType) => {

    const [sortStatus, setSortStatus] = useState<string>("작성일 최신순");

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

    const clickedSortBtn = (e: React.MouseEvent) => {
        const sort = document.querySelector(".sort");
        const target = (e.target as HTMLInputElement);
        sort!.classList.remove("active");
        sortBy(target.value, target.innerText);
    }

    const sortBy = (value: string, innerText: string) => {
        switch (value) {
            case "cre_asc":
                setNotes(ogNotes);
                setSortStatus(innerText);
                break;
            case "cre_desc":
                const newData = [...ogNotes].reverse();
                setNotes(newData);
                setSortStatus(innerText);
                break;
            case "visit_asc":
                break;
            case "visit_desc":
                break;
        }
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
                                    {sortStatus}
                                </button>
                                <div className="arrow" onClick={selectedToggle}><RiArrowDownSLine size={"1.5em"} /></div>
                            </div>
                            <div className="sort">
                                <button type="button" onClick={clickedSortBtn} value="cre_asc">작성일 최신순</button>
                                <button type="button" onClick={clickedSortBtn} value="cre_desc">작성일 오래된순</button>
                                <button type="button" onClick={clickedSortBtn} value="visit_asc">방문일 최신순</button>
                                <button type="button" onClick={clickedSortBtn} value="visit_desc">방문일 오래된순</button>
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