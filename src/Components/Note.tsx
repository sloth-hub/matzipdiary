import React from "react";

export const Note = ({ note }: any) => {

    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        location,
        images,
        menu,
        text } = note;

    return (
        <div className="note">
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
            <div>
                <span>내용</span>
                <p>{text}</p>
            </div>
            <div>
                {menu ? menu.map((v: any, i: number) =>
                (<div key={i}>
                    <span className="">{v.menuName}</span>
                    <span className="">{v.menuPrice}</span>
                </div>
                )
                ) : <></>}
            </div>
        </div>
    )
}