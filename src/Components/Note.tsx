import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
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
                    <div className="img-box" key={images[0].fileUrl.slice(-12)}><img src={images[0].fileUrl} loading="lazy" /><span className="imgcount">+{images.length-1}</span></div>
                    : <div className="img-box only" key={images[0].fileUrl.slice(-12)}><img src={images[0].fileUrl} loading="lazy" /></div>
                    : <></>}
            </div>
            <div className="content-wrap">
                <div>
                    <span>{date_visited}</span>
                    <span>{foodCategory}</span>
                </div>
                <div className="place">
                    <HiLocationMarker />
                    <span>{placeName}</span>
                </div>
                <p>{text}</p>
            </div>
            <div className="bottom-wrap">
                <span className="date">{date_created.slice(0, 10)}</span>
                <Link to={`/note/${id}`} state={note} className="more">
                    <span>more</span>
                    <BiChevronRight size={"1.2em"} />
                </Link>
            </div>
        </div>
    )
}