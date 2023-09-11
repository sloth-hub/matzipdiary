import React from "react";
import { useLocation, useNavigate } from "react-router";

export const Detail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        text } = location.state;

    return (
        <div className="detail">
            <div>
                {images ? images.map((image: any, i: number) => <img src={image.fileUrl} key={i} />)
                    : <></>}
            </div>
            <div>
                <span>작성일</span>
                <span>{date_created}</span>
            </div>
            <div>
                <span >방문일자</span>
                <span>{date_visited}</span>
            </div>
            <div>
                <span>카테고리</span>
                <span>{foodCategory}</span>
            </div>
            <div>
                <span>가게명</span>
                <span>{placeName}</span>
            </div>
            <p>{text}</p>
            <button type="button" onClick={() => navigate("/")}>뒤로</button>
        </div>
    )
}