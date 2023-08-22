import React, { ChangeEvent, useEffect, useState } from "react";

export const WriteNote = () => {

    useEffect(() => {
        const categories = document.querySelector(".food-category");
        categories!.addEventListener("click", (e: Event) => {
           clickedMenu(e);
        });
    }, []);

    const onSubmit = () => {

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

    return (
        <form onSubmit={onSubmit}>
            <div className="input-box">
                <label htmlFor="date_visited">방문일자</label>
                <input type="date" name="date_visited" id="date_visited" />
            </div>
            <div className="select-box">
                <div className="selected">
                    <div className="selected-value">
                        음식 카테고리
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
            <div className="input-box">
                <label htmlFor="loacation">가게명</label>
                <input type="text" name="" id="" />
            </div>
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
        </form>
    )
}