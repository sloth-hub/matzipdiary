import React from "react";
import { BiSolidStar } from "react-icons/bi";
import { NoteInterface } from "../interfaces/note.interface";

type Props = {
    rate: number,
    setInputs: (value: NoteInterface) => void,
    inputs: NoteInterface,
}

export const StarRating = ({ rate, setInputs, inputs }: Props) => {

    const handleClickedRating = (e: React.MouseEvent) => {
        e.preventDefault();
        const val = Number((e.currentTarget.children[0] as HTMLInputElement).value);
        if (setInputs !== undefined) {
            setInputs({ ...inputs, rate: val });
        }
    }

    return (
        <div className="star-rating-wrap">
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, i) => (
                    <div className="star-wrap">
                        <label className="star-rating-label" htmlFor="star-half" onClick={handleClickedRating}>
                            <input type="radio" name="rating" id="star-half" data-name="rate" value={i + 0.5} key={i + 0.5} />
                            <BiSolidStar className="star-icon" />
                        </label>
                        <label className="star-rating-label" htmlFor="star-fill" onClick={handleClickedRating}>
                            <input type="radio" name="rating" id="star-fill" data-name="rate" value={i + 1} key={i + 1} />
                            <BiSolidStar className="star-icon" />
                        </label>
                    </div>
                ))}
                <span className="rate-count">{inputs.rate}</span>
            </div>
        </div>
    );
};

export default StarRating;