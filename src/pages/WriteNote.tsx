import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../Firebase";

export const WriteNote = ({ userObj }: any) => {

    const onSubmit = () => {

    }

    return (
        <form onSubmit={onSubmit}>
            <input type="date" name="date_visited" id="date_visited" />
            <input type="" name="date_visited" id="date_visited" />
            <select name="food_category" id="food_category">
                <option value="koreanFood">한식</option>
                <option value="westernFood">양식</option>
                <option value="chineseFood">중식</option>
                <option value="japaneseFood">일식</option>
                <option value="asiaFusionFood">아시아/퓨전</option>
                <option value="cafe">카페</option>
            </select>
            <textarea name="text" id="text" />
        </form>
    )
}