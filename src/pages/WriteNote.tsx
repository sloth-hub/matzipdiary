import React, { ChangeEvent, useEffect, useState } from "react";
import { NoteInterface } from "../interfaces/note.interface";
import Map from "../Components/Map";
import { useNavigate } from "react-router";

export const WriteNote = ({ userObj }: any) => {

    useEffect(() => {
        const categories = document.querySelector(".food-category");
        categories!.addEventListener("click", (e: Event) => {
            clickedMenu(e);
        });
    }, []);

    const [inputs, setInputs] = useState<NoteInterface>({
        uid: userObj.uid,
        date_created: "",
        date_visited: "",
        foodCategory: "",
        location: "",
        text: "",
        placeName: "",
        images: {
            fileUrl: ""
        },
        menu: {
            menuName: "",
            menuPrice: 0,
        }
    });

    const [location, setLocation] = useState({
        La: 0,
        Ma: 0
    });

    const navigate = useNavigate();

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(location);
    }

    const addMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const menuUl = document.querySelector(".menu-list");
        const li = document.createElement("li");
        li.innerHTML = `<input type="text" name="menuName" id="menuName" placeholder="메뉴명"/>
        <input type="number" name="menuPrice" id="menuPrice" />
        <span>원</span>`;
        menuUl!.appendChild(li);
    }

    const selectedToggle = () => {
        const food_category = document.querySelector(".food-category");
        food_category!.classList.toggle("active");
    }

    const clickedMenu = (e: Event) => {
        const selectedValue = document.querySelector(".selected-value");
        const evtTagrget = e.target as HTMLLIElement;
        if (evtTagrget.tagName === "LI") {
            (selectedValue as HTMLElement).innerText = evtTagrget.innerText;
        }
    }

    const test = (e: ChangeEvent) => {
        console.log(e);
    }

    return (
        <form className="note-form" onSubmit={onSubmit}>
            <div className="input-wrap">
                <div className="input-box">
                    <label htmlFor="date_visited">방문일자</label>
                    <input type="date" name="date_visited" id="date_visited" />
                </div>
                <div className="select-box">
                    <label>음식 카테고리</label>
                    <div className="selected">
                        <div className="selected-value">
                        </div>
                        <div className="arrow" onClick={selectedToggle}>&or;</div>
                    </div>
                    <ul className="food-category">
                        <li>한식</li>
                        <li>양식</li>
                        <li >중식</li>
                        <li >일식</li>
                        <li >아시아/퓨전</li>
                        <li>카페</li>
                    </ul>
                </div>
            </div>
            <div className="input-box">
                <input type="text" name="placeName" id="placeName" value="위치를 선택하면 가게명이 입력됩니다." onChange={test} readOnly />
            </div>
            <Map setLocation={setLocation} />
            <div className="input-box">
                <ul className="menu-list">
                    <li>
                        <input type="text" name="menuName" id="menuName" placeholder="메뉴명" />
                        <input type="number" name="menuPrice" id="menuPrice" />
                        <span>원</span>
                    </li>
                </ul>
                <button onClick={addMenu}>추가</button>
            </div>
            <textarea name="text" id="text" placeholder="솔직한 후기를 남겨보세요!" />
            <div className="btn-wrap">
                <button type="button" onClick={() => navigate("/")}>뒤로</button>
                <button type="submit">완료</button>
            </div>
        </form>
    )
}