import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight, BiCalendar } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";

export const Note = ({ note, sortStatus }: any) => {

    const {
        date_visited,
        foodCategory,
        placeName,
        images,
        text,
        id } = note;

    const imgLazyLoading = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLImageElement;
        const loader = target.nextSibling as HTMLElement;
        const div = document.querySelectorAll(".note .img-wrap>div");
        if (target.complete) {
            loader.classList.add("false");
            div.forEach((v) => (v as HTMLElement).style.minWidth = "188px");
        }
    }

    return (
        <div className="note">
            <div className="img-wrap">
                {images ? images.length > 1 ?
                    <>
                        <div>
                            <img src={images[0].fileUrl} key={images[0].fileUrl.slice(-12)} onLoad={imgLazyLoading} />
                            <span className="loading"></span>
                        </div>
                        <span className="imgcount">+{images.length - 1}</span>
                    </>
                    : <>
                        <div>
                            <img src={images[0].fileUrl} key={images[0].fileUrl.slice(-12)} onLoad={imgLazyLoading} />
                            <span className="loading"></span>
                        </div>
                    </>
                    : <></>}
            </div>
            <div className="content-wrap">
                <div className="date">
                    <BiCalendar />
                    <span>{date_visited}</span>
                </div>
                <div className="place">
                    <HiLocationMarker />
                    <span className="category">{foodCategory}</span>
                    <span>{placeName}</span>
                </div>
                <p>{text.replace(/\<|\/|[a-z]|\>/g, "")}</p>
            </div>
            <Link to={`/note/${id}`} state={{ note, sortStatus }} className="more">
                <span>more</span>
                <BiChevronRight size={"1.2em"} />
            </Link>
        </div>
    )
}