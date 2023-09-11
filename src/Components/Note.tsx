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
                {images ? images.length > 1 ? <>
                    {images.slice(0,1).map((image: any, i: number) => <div className="img-box"><img src={image.fileUrl} key={i} /></div>)}
                </> :
                    <>
                        {images.slice(0,1).map((image: any, i: number) => <div className="img-box only"><img src={image.fileUrl} key={i} /></div>)}
                    </>
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