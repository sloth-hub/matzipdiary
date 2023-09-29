import React, { useEffect, useState } from "react";
import { Note } from "../Components/Note";
import { NoteInterface } from "../interfaces/note.interface";
import { Link, useLocation } from "react-router-dom";
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

    const location = useLocation();
    const prevSortStatus = location.state;
    const [sortStatus, setSortStatus] = useState<string>(prevSortStatus ? prevSortStatus : "정렬");

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
        const target = e.target as HTMLInputElement;
        sort!.classList.remove("active");
        sortBy(target.value, target.innerText);
    }

    const sortBy = (value: string, innerText: string) => {
        switch (value) {
            case "cre_asc":
                const cre_asc = notes.sort((a, b) => {
                    if (a.date_created < b.date_created) return 1;
                    else if (a.date_created > b.date_created) return -1;
                    else return 0;
                });
                setNotes(cre_asc);
                setSortStatus(innerText);
                break;
            case "cre_desc":
                const cre_desc = notes.sort((a, b) => {
                    if (a.date_created > b.date_created) return 1;
                    else if (a.date_created < b.date_created) return -1;
                    else return 0;
                });
                setNotes(cre_desc);
                setSortStatus(innerText);
                break;
            case "visit_asc":
                const visit_asc = notes.sort((a, b) => {
                    if (a.date_visited < b.date_visited) return 1;
                    else if (a.date_visited > b.date_visited) return -1;
                    else return 0;
                });
                setNotes(visit_asc);
                setSortStatus(innerText);
                break;
            case "visit_desc":
                const visit_desc = notes.sort((a, b) => {
                    if (a.date_visited > b.date_visited) return 1;
                    else if (a.date_visited < b.date_visited) return -1;
                    else return 0;
                });
                setNotes(visit_desc);
                setSortStatus(innerText);
                break;
        }
    }

    const clickedCategory = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const catName = target.innerText;
        const lists = (target.parentNode as HTMLElement).children;
        if (target.tagName === "LI") {
            if (target.classList.contains("active")) {
                setNotes(ogNotes);
                target.classList.remove("active");
            } else {
                const result = ogNotes.filter(note => note.foodCategory === catName);
                setNotes(result);
                for (let i = 0; i < lists.length; i++) {
                    lists[i].classList.remove("active");
                }
                target.classList.add("active");
            }
        }
    }

    return (
        <>
            {isLoading ? <div className="loader">Loading...</div>
                :
                <>
                    <div className="search">
                        <ul className="category" onClick={clickedCategory}>
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
                    <div className="notes-wrap">
                        <div className="notes">
                            {notes.length > 0 ?
                                notes.map((note, index) =>
                                    <Note key={index} note={note} sortStatus={sortStatus} />
                                )
                                :
                                <div className="warn">
                                    <PiWarningFill size={"2em"} />
                                    <p>일기가 없습니다.<br /> 우측 하단의 버튼을 눌러 일기를 써보세요!</p>
                                </div>
                            }
                        </div>
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