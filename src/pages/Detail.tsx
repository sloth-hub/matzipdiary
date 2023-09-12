import React, { useEffect } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft } from "react-icons/bi";

export const Detail = () => {

    useEffect(() => {
        mapInit();
    }, []);

    const statedata = useLocation();
    const navigate = useNavigate();
    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        location,
        text } = statedata.state;

    const mapInit = () => {

        const kakao = (window as any).kakao;
        const mapContainer = document.getElementById("map");
        const mpaOption = {
            center: new kakao.maps.LatLng(location.lat, location.lng), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(mapContainer, mpaOption);
        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        const iwContent = `<div class="info">
        <span>${placeName}</span>
        <div>
        <a href="https://map.kakao.com/link/map/${placeName},${location.lat},${location.lng}" target="_blank">큰지도보기</a>
        <a href="https://map.kakao.com/link/to/${placeName},${location.lat},${location.lng}">길찾기</a>
        </div>
        </div>`;
        const iwPosition = new kakao.maps.LatLng(location.lat, location.lng);
        const infowindow = new kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent
        });
        infowindow.open(map, marker);
    }

    const toggleMap = () => {
        const map = document.getElementById("map");
        map!.classList.toggle("active");
    }

    return (
        <div className="detail">
            <div>
                <span className="title">작성일</span>
                <span>{date_created}</span>
            </div>
            <div>
                <span className="title">방문일자</span>
                <span>{date_visited}</span>
            </div>
            <div>
                <span className="title">카테고리</span>
                <span>{foodCategory}</span>
            </div>
            <div>
                <span className="title">가게명</span>
                <span>{placeName}</span>
            </div>
            <button type="button" onClick={toggleMap}>지도 보기</button>
            <div id="map" className="map"></div>
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