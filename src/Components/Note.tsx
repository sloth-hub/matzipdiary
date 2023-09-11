import React from "react";
import { Link } from "react-router-dom";

export const Note = ({ note }: any) => {

    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        text,
        id } = note;

    return (
        <div className="note">
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
            <Link to={`/note/${id}`} state={note} className="more">
                more
            </Link>
        </div>
    )
}