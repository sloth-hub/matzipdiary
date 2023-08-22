import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../Firebase";

export const WriteNote = () => {

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


    return (
        <form onSubmit={onSubmit}>
            <div className="input-box">
                <label htmlFor="date_visited">방문일자</label>
                <input type="date" name="date_visited" id="date_visited" />
            </div>
            <div className="select-box">
                <ul id="food_category">
                    <li>분류</li>
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
                        <input type="text" name="menuName" id="menuName" placeholder="메뉴명"/>
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