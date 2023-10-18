import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import { BiChevronLeft } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage"
import { storage, db } from "../Firebase";

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
    const id = statedata.state.id;
    const sortStatus = statedata.state.sortStatus;

    useEffect(() => {
        mapInit();
        resizedImgWrap();
    }, [slideNum]);

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
            if (0 < slideNum)
                setSlideNum(slideNum - slideWidth);
        } else {
            if (slideWidth * images.length >= slideNum)
                setSlideNum(slideNum + slideWidth);
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
            if (window.innerWidth < 768.98) {
                setSlideWidth(imgWrap.offsetWidth);
                target.style.minWidth = `${imgWrap.offsetWidth}px`;
                setSlideCount(1);
            } else {
                setSlideCount(0);
            }
        }
    }

    const resizedImgWrap = () => {
        const imgWrap = document.querySelector(".img-wrap") as HTMLElement;
        const imgs = document.querySelectorAll(".detail .img-wrap ul li img");
        const slider = document.querySelector(".slider") as HTMLElement;
        window.addEventListener("resize", ({ target }) => {
            const tgt = target as Window;
            // 슬라이드 2개씩일 때
            if (tgt.innerWidth > 768.98) {
                imgs.forEach((v) => {
                    (v as HTMLElement).style.minWidth = "319px";
                });
                setSlideWidth(319);
                if (slideNum > 319 * (images.length - 2)) {
                    // const count = Math.floor(Number(slider.dataset.num));
                    // 수정 필요
                }
                setSlideCount(0);
            } else {
                // 슬라이드 1개씩일 때
                const offsetWidth = imgWrap.offsetWidth;
                imgs.forEach((v) => {
                    (v as HTMLElement).style.minWidth = `${offsetWidth}px`;
                });
                setSlideWidth(offsetWidth);
                setSlideNum(offsetWidth * Number(slider.dataset.num));
                setSlideCount(1);
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

    return (
        <div className="detail">
            {address.lotAddr ?
                <>
                    <div className={images.length == 1 ? "img-wrap only" : "img-wrap"}>
                        <div className="modal">
                            <img src={modalImg} alt="미리보기" />
                            <button type="button" className="close" onClick={modalBtnHandler}>
                                <GrClose size={"1.8em"} />
                            </button>
                        </div>
                        <ul className="slider" style={{ transform: `translate(-${slideNum}px)` }} data-num={slideNum / slideWidth}>
                            {images ? images.map((image: any, i: number) =>
                                <li key={i} onClick={clickedImage}>
                                    <img src={image.fileUrl} onLoad={imgLazyLoading} />
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
                                <span>{address.roadAddr}</span>
                                <span> 지번&#41; {address.lotAddr}</span>
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
                </>
                :
                <div className="loader">
                    Loading...
                </div>
            }
        </div>
    )
}