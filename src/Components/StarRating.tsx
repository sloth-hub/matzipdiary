import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { NoteInterface } from "../interfaces/note.interface";

type Props = {
    prevRate: any,
    setInputs: (value: NoteInterface) => void,
    inputs: NoteInterface,
}

export const StarRating = ({ prevRate, setInputs, inputs }: Props) => {

    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    useEffect(() => {
        if (prevRate !== 0) {
            setSelectedRating(prevRate);
        }
    }, [prevRate]);

    const handleRatingChange = (value: number) => {
        setSelectedRating(value);
        if (setInputs !== undefined) {
            setInputs({ ...inputs, rate: value });
        }
    };

    const handleMouseEnter = (rating: number) => {
        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(null);
    };

    return (
        <div className="star-rating-wrap">
            <p>별점을 매겨주세요.<span className="required">*</span></p>
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, i) => (
                    <div className="star-wrap" key={i}>
                        <label className="star-rating-label half"
                            htmlFor={`star-half-${i}`}
                            onMouseEnter={() => handleMouseEnter(i + 0.5)}
                            onMouseLeave={handleMouseLeave}>
                            <input type="radio" name="rating" id={`star-half-${i}`}
                                value={i + 0.5}
                                onClick={() => handleRatingChange(i + 0.5)} />
                            <BiSolidStar className="star-icon"
                                style={{
                                    color: (hoveredRating && hoveredRating >= i + 0.5) ||
                                        (!hoveredRating && selectedRating >= i + 0.5)
                                        ? "var(--main-color)"
                                        : "var(--M-gray)"
                                }} />
                        </label>
                        <label className="star-rating-label fill" htmlFor={`star-full-${i}`}
                            onMouseEnter={() => handleMouseEnter(i + 1)}
                            onMouseLeave={handleMouseLeave}>
                            <input type="radio" name="rating" id={`star-full-${i}`}
                                value={i + 1}
                                onClick={() => handleRatingChange(i + 1)} />
                            <BiSolidStar className="star-icon"
                                style={{
                                    color: (hoveredRating && hoveredRating >= i + 1) ||
                                        (!hoveredRating && selectedRating >= i + 1)
                                        ? "var(--main-color)"
                                        : "var(--M-gray)"
                                }} />
                        </label>
                    </div>
                ))}
                <span className="rate-count">{hoveredRating ? hoveredRating : selectedRating}</span>
            </div>
        </div>
    );
};

export default StarRating;