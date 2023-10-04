import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

export const Detail = () => {

    const [address, setAddress] = useState({ lotAddr: "", roadAddr: "" });
    const [slideNum, setSlideNum] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(319);
    const [slideCount, setSlideCount] = useState<number>(0);
    const [modalImg, setModalImg] = useState<string>("");

    const statedata = useLocation();
    const navigate = useNavigate();
    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        location,
        text } = statedata.state.note;

    const sortStatus = statedata.state.sortStatus;

    useEffect(() => {
        mapInit();
        resizedImgWrap();
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

    const slideBtnHander = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.currentTarget;
        if (target.className === "prev") {
            if (0 < slideNum) {
                setSlideNum(slideNum - slideWidth);
            }
        } else {
            if ((images.length - (3 - slideCount)) * slideWidth >= slideNum) {
                setSlideNum(slideNum + slideWidth);
            }
        }
    }

    const clickedImage = (e: React.MouseEvent) => {
        const body = document.querySelector("body");
        const modal = document.querySelector(".modal");
        const target = (e.target as HTMLElement);
        const imgsrc = (target.children[0] as HTMLImageElement).src;
        setModalImg(imgsrc);
        modal!.classList.add("active");
        body!.style.overflow = "hidden";
    }

    const modalBtnHandler = () => {
        const body = document.querySelector("body");
        const modal = document.querySelector(".modal");
        modal!.classList.remove("active");
        body!.style.overflow = "auto";
    }

    const imgLazyLoading = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLImageElement;
        const loader = target.nextSibling as HTMLElement;
        const imgWrap = document.querySelector(".img-wrap") as HTMLElement;
        if (target.complete) {
            loader.classList.add("false");
            if (window.innerWidth < 768.98) {
                setSlideWidth(imgWrap.offsetWidth);
            }
        }
    }

    const resizedImgWrap = () => {
        const imgWrap = document.querySelector(".img-wrap") as HTMLElement;
        const imgs = document.querySelectorAll(".detail .img-wrap ul li img");
        window.addEventListener("resize", ({ target }) => {
            const tgt = target as Window;
            if (tgt.innerWidth > 768.98) {
                imgs.forEach((v) => {
                    (v as HTMLElement).style.minWidth = "319px";
                });
                setSlideWidth(319);
                setSlideNum(0);
                setSlideCount(0);
            } else {
                const offsetWidth = imgWrap.offsetWidth;
                imgs.forEach((v) => {
                    (v as HTMLElement).style.minWidth = `${imgWrap.offsetWidth}px`;
                });
                setSlideWidth(offsetWidth);
                setSlideCount(1);
            }
        });
    }

    return (
        <div className="detail">
            <div className="img-wrap">
                <div className="modal">
                    <img src={modalImg} alt="미리보기" />
                    <button type="button" className="close" onClick={modalBtnHandler}>
                        <GrClose size={"1.8em"} />
                    </button>
                </div>
                <ul className="slider" style={{ transform: `translate(-${slideNum}px)` }}>
                    {images ? images.map((image: any, i: number) =>
                        <li key={i} onClick={clickedImage}>
                            <img src={image.fileUrl} className="only" onLoad={imgLazyLoading} />
                            <span className="loading"></span>
                        </li>)
                        : <></>}
                </ul>
                {images.length > 1 &&
                    <div className="slide-btns">
                        <button type="button" className={slideNum == 0 ? "prev hide" : "prev"} onClick={slideBtnHander}>
                            &lt;
                        </button>
                        <button type="button" className={slideNum == slideWidth * (images.length - (2 - slideCount)) ? "next hide" : "next"} onClick={slideBtnHander}>
                            &gt;
                        </button>
                    </div>
                }
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
            <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="bottom-wrap">
                <button type="button" className="back" onClick={() => navigate("/", { state: sortStatus })}>
                    <BiChevronLeft size={"1.5em"} />
                    <span>뒤로</span>
                </button>
                <span className="created-date">{date_created}</span>
            </div>
        </div>
    )
}