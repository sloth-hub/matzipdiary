import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft } from "react-icons/bi";

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
            <div className="date">
                <div>
                    <span className="title">작성일</span>
                    <span>{date_created}</span>
                </div>
                <div>
                    <span className="title">방문일자</span>
                    <span>{date_visited}</span>
                </div>
            </div>
            <div className="place">
                <div className="placename">
                    <span className="title">{placeName}</span>
                    <span>{foodCategory}</span>
                </div>
                <div className="address">
                    <span>{address && address.roadAddr}</span>
                    <span>{address && address.lotAddr}</span>
                    <a href={`https://map.kakao.com/link/map/${placeName},${location.lat},${location.lng}`} target="_blank">큰지도보기</a>
                </div>
            </div>
            <div className="img-wrap">
                {images ? images.map((image: any, i: number) => <img src={image.fileUrl} key={i} />)
                    : <></>}
            </div>
            <p>{text}</p>
            <button type="button" className="back" onClick={() => navigate("/")}>
                <BiChevronLeft size={"1.5em"} />
                <span>뒤로</span>
            </button>
        </div>
    )
}