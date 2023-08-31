import React, { ChangeEvent, useEffect, useState } from "react";
import { NoteInterface } from "../interfaces/note.interface";
import Map from "../Components/Map";
import { useNavigate } from "react-router";
import { RiArrowDownSLine } from "react-icons/ri";

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

    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(inputs);
        // const test = (document.querySelector(".selected-value") as HTMLInputElement).value;
        // console.log(test);
    }

    const addMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const menuUl = document.querySelector(".menu-list");
        const li = document.createElement("li");
        li.innerHTML = `<li><input type="text" name="menuName" id="menuName" placeholder="메뉴명" /><input type="number" name="menuPrice" id="menuPrice" /><span>원</span></li>`;
        menuUl!.appendChild(li);
    }

    const selectedToggle = () => {
        const food_category = document.querySelector(".food-category");
        food_category!.classList.toggle("active");
    }

    const selectedHover = () => {
        document.querySelector(".food-category")?.classList.remove("active");
    }

    const clickedMenu = (e: Event) => {
        const selectedValue = document.querySelector(".selected-value");
        const { value } = e.target as HTMLInputElement;
        if ((e.target as HTMLElement).tagName === "BUTTON") {
            (selectedValue as HTMLInputElement).value = value;
            (selectedValue as HTMLInputElement).innerText = value;
        }
    }

    const onChange = (e: any) => {
        let data_name;
        let value;
        if (e.type === "text") {
            data_name = e.dataset["name"];
            value = e.value;
        } else {
            data_name = e.target.dataset["name"];
            value = e.target.value;
        }
        setInputs({
            ...inputs, [data_name]: value
        });
    }

    return (
        <form className="note-form" onSubmit={onSubmit}>
            <div className="input-wrap">
                <div className="input-box">
                    <label htmlFor="date_visited">방문일자</label>
                    <input type="date" name="date_visited" data-name="date_visited" onChange={onChange} />
                </div>
                <div className="select-box" onMouseLeave={selectedHover}>
                    <label htmlFor="foodCategory">음식 카테고리</label>
                    <div className="selected">
                        <button type="button" name="foodCategory" className="selected-value" onClick={selectedToggle}>
                        </button>
                        <div className="arrow" onClick={selectedToggle}><RiArrowDownSLine size={"1.5em"} /></div>
                    </div>
                    <ul className="food-category" >
                        <button type="button" data-name="foodCategory" value="한식" onClick={onChange}>한식</button>
                        <button type="button" data-name="foodCategory" value="양식" onClick={onChange}>양식</button>
                        <button type="button" data-name="foodCategory" value="중식" onClick={onChange}>중식</button>
                        <button type="button" data-name="foodCategory" value="일식" onClick={onChange}>일식</button>
                        <button type="button" data-name="foodCategory" value="아시아/퓨전" onClick={onChange}>아시아/퓨전</button>
                        <button type="button" data-name="foodCategory" value="카페" onClick={onChange}>카페</button>
                    </ul>
                </div>
            </div>
            <div className="input-box">
                <button type="button" id="placeName" data-name="placeName" >
                    위치를 선택하면 가게명이 입력됩니다.
                </button>
            </div>
            <Map inputs={inputs} setInputs={setInputs} />
            <div className="input-box">
                <ul className="menu-list">
                    <li>
                        <input type="text" name="menuName" id="menuName" placeholder="메뉴명" />
                        <input type="number" name="menuPrice" id="menuPrice" />
                        <span>원</span>
                    </li>
                </ul>
                <button onClick={addMenu} className="add-btn">+</button>
            </div>
            <textarea name="text" id="text" data-name="text" placeholder="솔직한 후기를 남겨보세요!" onChange={onChange} />
            <div className="btn-wrap">
                <button type="button" onClick={() => navigate("/")} className="back">뒤로</button>
                <button type="submit">완료</button>
            </div>
        </form>
    )
}