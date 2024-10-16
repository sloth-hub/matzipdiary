import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"
import { storage, db } from "../Firebase";
import StarRating from "../Components/StarRating";

export const Detail = () => {

    const [address, setAddress] = useState({ lotAddr: "", roadAddr: "" });
    const [slideNum, setSlideNum] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(0);
    const [count, setCount] = useState<number>(1);
    const [modalImg, setModalImg] = useState<string>("");

    const statedata = useLocation();
    const navigate = useNavigate();
    const { date_created,
        date_visited,
        foodCategory,
        placeName,
        images,
        location,
        rate,
        text } = statedata.state.note;
    const id = statedata.state.id;
    const sortStatus = statedata.state.sortStatus;

    useEffect(() => {
        mapInit();
        resizedImgWrap();
    }, [slideNum]);

    const mapInit = async () => {
        const kakao = (window as any).kakao;
        const geocoder = new kakao.maps.services.Geocoder();
        if (location.lat && location.lng) {
            await geocoder.coord2Address(location.lng, location.lat, (snapshot: any) => {
                setAddress({
                    lotAddr: snapshot[0].address.address_name,
                    roadAddr: snapshot[0].road_address.address_name,
                });
            });
        }
    }

    const slideBtnHander = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.currentTarget;
        if (target.className === "prev") {
            if (0 < slideNum) {
                setCount(count - 1);
                setSlideNum(slideNum - slideWidth);
            }
        } else {
            if (slideWidth * images.length >= slideNum) {
                setCount(count + 1);
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
        const target = e.currentTarget as HTMLImageElement;
        const loader = target.nextSibling as HTMLElement;
        const imgWrap = document.querySelector(".img-wrap") as HTMLElement;
        if (target.complete) {
            loader.classList.add("false");
            setSlideWidth(imgWrap.offsetWidth);
            target.style.minWidth = `${imgWrap.offsetWidth}px`;
        }
    }

    const resizedImgWrap = () => {
        window.addEventListener("resize", () => {
            const imgWrap = document.querySelector(".img-wrap") as HTMLElement;
            if (window.location.href.includes("note") && imgWrap) {
                const imgs = document.querySelectorAll(".detail .img-wrap ul li img");
                const offsetWidth = imgWrap.offsetWidth;

                imgs.forEach((v) => {
                    (v as HTMLElement).style.minWidth = `${offsetWidth}px`;
                });
                setSlideWidth(offsetWidth);
                setSlideNum(offsetWidth * (count - 1));
            }
        });
    }

    const deleteNote = async (e: React.MouseEvent) => {
        e.preventDefault();
        const response = window.confirm("정말로 삭제하시겠습니까?");
        // 두번 클릭해야 뜸. 수정 필요
        if (response) {
            await deleteDoc(doc(db, "notes", id)).then(() => {
                // 이미지 데이터 삭제
                images.forEach((img: { fileUrl: string }) => {
                    const imgRef = ref(storage, img.fileUrl);
                    deleteObject(imgRef).then(() => {
                        console.log("이미지 삭제 완료");
                    }).catch(err => console.log(`${err.code} - ${err.message}`));
                });
                // 첫화면으로+새로고침
                navigate("/");
                navigate(0);
            }).catch(err => console.log(`${err.code} - ${err.message}`));
        }
    }

    const filteringAddr = (addr: string) => {
        const cities = ["서울", "인천", "대구", "광주", "대전", "울산"];
        if (cities.some(city => addr.includes(city))) {
            return addr.includes("경기 광주") ? addr.substring(0, 5) : addr.substring(0, 2);
        } else if (addr.includes("특별자치도")) {
            const siIndex = addr.indexOf("시");
            const gunIndex = addr.indexOf("군");
            const index = siIndex !== -1 ? siIndex : gunIndex;

            return index > 1 && addr.substring(index - 2, index);
        } else {
            return addr.substring(0, 5);
        };
    }

    return (
        <div className="detail">
            {images.length > 0 &&
                <div className={images.length == 1 ? "img-wrap only" : "img-wrap"}>
                    <div className="modal">
                        <img src={modalImg} alt="미리보기" />
                        <button type="button" className="close" onClick={modalBtnHandler}>
                            <GrClose size={"1.8em"} />
                        </button>
                    </div>
                    <ul className="slider" style={{ transform: `translate(-${slideNum}px)` }} >
                        {images ? images.map((image: any, i: number) =>
                            <li key={i} onClick={clickedImage}>
                                <img src={image.fileUrl} onLoad={imgLazyLoading} />
                                <span className="loading"></span>
                            </li>)
                            : <></>}
                    </ul>
                    {images.length > 1 &&
                        <>
                            <div className="slide-btns">
                                <button type="button" className={count === 1 ? "prev hide" : "prev"} onClick={slideBtnHander}>
                                    &lt;
                                </button>
                                <button type="button" className={count === images.length ? "next hide" : "next"} onClick={slideBtnHander}>
                                    &gt;
                                </button>
                            </div>
                            <div className="count"><span>{count}</span>/{images.length}</div>
                        </>
                    }
                </div>
            }
            <div className="top-wrap">
                <div className="info-wrap">
                    <div className="place">
                        <div className="placename">
                            <span className="title">{placeName}</span>
                            {address.lotAddr ?
                                <a href={`https://map.kakao.com/link/map/${placeName},${location.lat},${location.lng}`} target="_blank">
                                    <HiOutlineMap size={"1.5em"} />
                                </a>
                                : <></>
                            }
                        </div>
                        <div className="star-rating-wrap">
                            <StarRating rate={rate} />
                            <span className="star-rating-text">{rate}</span>
                        </div>
                        <div className="info">
                            <span aria-label="지역">{filteringAddr(address.lotAddr)}</span>
                            <span aria-label="업종">{foodCategory}</span>
                            <span aria-label="방문일">{date_visited} 방문</span>
                        </div>
                    </div>
                </div>
                <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            <div className="bottom-wrap">
                <button type="button" className="back" onClick={() => navigate("/", { state: sortStatus })}>
                    <BiChevronLeft size={"1.5em"} />
                    <span>뒤로</span>
                </button>
                <div className="right-wrap">
                    <span className="created-date">{date_created}</span>
                    <Link to={`/note/${id}/write`} state={{ data: statedata.state.note, id: id }} className="modify" >
                        <span>수정</span>
                    </Link>
                    <button type="button" className="delete" onClick={deleteNote} >
                        <span>삭제</span>
                    </button>
                </div>
            </div>
            <div className={location.lat ? (address.lotAddr ? "loader hide" : "loader") : "loader hide"}>
                <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" />
            </div>
        </div>
    )
}