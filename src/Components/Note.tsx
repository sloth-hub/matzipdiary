import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight, BiCalendar } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";

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
            <div className="img-wrap">
                {images ? images.length > 1 ?
                    <><img src={images[0].fileUrl} key={images[0].fileUrl.slice(-12)} loading="lazy" /><span className="imgcount">+{images.length - 1}</span></>
                    : <><img src={images[0].fileUrl} key={images[0].fileUrl.slice(-12)} loading="lazy" /></>
                    : <></>}
            </div>
            <div className="content-wrap">
                <div className="date">
                    <BiCalendar/>
                    <span>{date_visited}</span>
                </div>
                <div className="place">
                    <HiLocationMarker />
                    <span className="category">{foodCategory}</span>
                    <span>{placeName}</span>
                </div>
                <p>{text}</p>
            </div>
            <Link to={`/note/${id}`} state={note} className="more">
                <span>more</span>
                <BiChevronRight size={"1.2em"} />
            </Link>
        </div>
    )
}