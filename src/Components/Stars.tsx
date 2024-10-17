import React from "react";
import { BiSolidStar, BiStar } from "react-icons/bi";
import { NoteInterface } from "../interfaces/note.interface";

type Props = {
    rate: number
}
export const StarRating = ({ rate }: Props) => {

    return (
        <div className="star-rating" role="img" aria-label={`별점: 5점 만점에 ${rate}점`}>
            <div className="star-rating-base" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => <BiSolidStar key={i} className="star" />)}
            </div>
            <div className="star-rating-fill" aria-hidden="true" style={{ width: `${(rate / 5) * 100}%` }}>
                {Array.from({ length: 5 }, (_, i) => <BiSolidStar key={i} className="star" />)}
            </div>
        </div>
    );
};

export default StarRating;