import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight, BiCalendar, BiSolidStar } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";

export const Note = ({ note, sortStatus }: any) => {

    const {
        date_visited,
        foodCategory,
        placeName,
        images,
        text,
        rate,
        id } = note;

    const imgLazyLoading = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLImageElement;
        const loader = target.nextSibling as HTMLElement;
        if (target.complete) {
            loader.classList.add("false");
        }
    }

    return (
        <div className="note">
            <div className="img-wrap">
                {images.length > 0 ? images.length > 1 ?
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
                    : <div>
                        <img src={`${process.env.PUBLIC_URL}/images/empty.png`} alt="이미지가 없음" />
                    </div>
                }
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
                <div className="star-rating" role="img" aria-label={`별점: 5점 만점에 ${rate}점`}>
                    <div className="star-rating-base" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, i) => <BiSolidStar key={i} className="star" />)}
                    </div>
                    <div className="star-rating-fill" aria-hidden="true" style={{ width: `${(rate / 5) * 100}%` }}>
                        {Array.from({ length: 5 }, (_, i) => <BiSolidStar key={i} className="star" />)}
                    </div>
                </div>
                <p>{text.replace(/(<([^>]+)>)/ig, "").replaceAll("&amp;", "")}</p>
            </div>
            <Link to={`/note/${id}`} state={{ note, id, sortStatus }} className="more">
                <span>more</span>
                <BiChevronRight size={"1.2em"} />
            </Link>
        </div>
    )
}