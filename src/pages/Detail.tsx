import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";

export const Detail = () => {

    const [address, setAddress] = useState({ lotAddr: "", roadAddr: "" });
    const statedata = useLocation();
    const navigate = useNavigate();
    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        location,
        text } = statedata.state;

    useEffect(() => {
        mapInit();
    }, []);

    const mapInit = async () => {
        const kakao = (window as any).kakao;
        const geocoder = new kakao.maps.services.Geocoder();
        await geocoder.coord2Address(location.lng, location.lat, (snapshot: any) => {
            setAddress({
                lotAddr: snapshot[0].address.address_name,
                roadAddr: snapshot[0].road_address.address_name,
            });
        });
    }

    return (
        <div className="detail">
            <div className="img-wrap">
                <ul className="slider">
                    {images ? images.map((image: any, i: number) =>
                        <li key={i}><img src={image.fileUrl} /></li>)
                        : <></>}
                </ul>
            </div>
            <div className="info-wrap">
                <div className="place">
                    <div className="placename">
                        <span className="title">{placeName}</span>
                        <a href={`https://map.kakao.com/link/map/${placeName},${location.lat},${location.lng}`} target="_blank">
                            <HiOutlineMap size={"1.5em"} />
                        </a>
                    </div>
                    <div className="address">
                        <span>{address ? address.roadAddr : " "}</span>
                        <span> 지번&#41; {address && address.lotAddr}</span>
                    </div>
                    <div className="date">
                        <span>{foodCategory}</span>
                        <span>{date_visited} 방문</span>
                    </div>
                </div>
            </div>
            <p>{text}</p>
            <div className="bottom-wrap">
                <button type="button" className="back" onClick={() => navigate("/")}>
                    <BiChevronLeft size={"1.5em"} />
                    <span>뒤로</span>
                </button>
                <span className="created-date">{date_created}</span>
            </div>
        </div>
    )
}