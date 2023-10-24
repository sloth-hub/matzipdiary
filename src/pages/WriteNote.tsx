import React, { useEffect, useState } from "react";
import { NoteInterface, Images } from "../interfaces/note.interface";
import Map from "../Components/Map";
import { useLocation, useNavigate } from "react-router";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { ref, getDownloadURL, updateMetadata, uploadBytes, deleteObject } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { storage, db } from "../Firebase";
import { v4 as uuid4 } from "uuid";
import moment from "moment";
import Editor from "../Components/Editor";

export const WriteNote = ({ userObj }: any) => {

    interface img {
        fileUrl: File
    }

    const [inputs, setInputs] = useState<NoteInterface>({
        uid: userObj.uid,
        id: "",
        date_created: "",
        date_visited: "",
        foodCategory: "",
        location: { lat: 0, lng: 0 },
        text: "",
        placeName: "",
        images: []
    });

    const statedata = useLocation();

    const [deleteImages, setDeleteImages] = useState<Images[]>([]);
    const [thumbnail, setThumbnail] = useState<Images[]>([]);
    const [image, setImage] = useState<img[]>([]);
    const [prevData, setPrevData] = useState<NoteInterface>({
        uid: userObj.uid,
        id: "",
        date_created: "",
        date_visited: "",
        foodCategory: "",
        location: { lat: 0, lng: 0 },
        text: "",
        placeName: "",
        images: []
    });
    const [quillText, setQuillText] = useState<string>("");
    const [isModify, setIsModify] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const categories = document.querySelector(".food-category");
        categories!.addEventListener("click", (e: Event) => {
            clickedMenu(e);
        });
        if (statedata.state) {
            setIsModify(true);
            setPrevData(statedata.state.data);
            setInputs({
                uid: userObj.uid,
                date_created: "",
                ...statedata.state.data
            });
            (document.querySelector("input[type='date']") as HTMLInputElement)!.value = statedata.state.data.date_visited;
            setThumbnail(statedata.state.data.images);
        }
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (thumbnail.length > 0) {
            if (isModify) {
                // 글 수정
                // thumbnail에서 firestore에 업로드된 이미지만 필터링
                const prevImages = thumbnail.filter((v, _) => v.fileUrl.includes("firebase"));
                // 새 이미지들을 firestore에 업로드
                const result = await Promise.all(
                    image.map(async (v, _) => {
                        const fileRef = ref(storage, `${userObj.uid}/${uuid4()}`);
                        await uploadBytes(fileRef, v.fileUrl);
                        const data = await updateMetadata(fileRef, { contentType: "image/jpeg" });
                        const resultUrl = await getDownloadURL(fileRef);
                        return { fileUrl: resultUrl };
                    })
                );
                // 업로드 된 새 이미지들을 newImages에 넣기
                const newImages = [...prevImages, ...result];
                const updateRef = doc(db, "notes", `${prevData.id}`);
                await updateDoc(updateRef, {
                    ...inputs,
                    text: quillText,
                    images: newImages,
                    date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                }).then(() => {
                    // firestore에서 삭제할 이미지 데이터들 삭제
                    deleteImages.forEach((imgs) => {
                        const imgRef = ref(storage, imgs.fileUrl);
                        deleteObject(imgRef).then(() => {
                            console.log("이미지 삭제 완료");
                        }).catch(err => console.log(`${err.code} - ${err.message}`));
                    });
                    alert("수정이 완료되었습니다.");
                    // 첫화면 + 새로고침
                    navigate("/");
                    navigate(0);
                }).catch(err => console.log(`${err.code} - ${err.message}`));
            } else {
                // 새로 글쓰기
                const result = await Promise.all(
                    image.map(async (v, _) => {
                        const fileRef = ref(storage, `${userObj.uid}/${uuid4()}`);
                        await uploadBytes(fileRef, v.fileUrl);
                        const data = await updateMetadata(fileRef, { contentType: "image/jpeg" });
                        const resultUrl = await getDownloadURL(fileRef);
                        return { fileUrl: resultUrl };
                    })
                );
                await addDoc(collection(db, "notes"), {
                    ...inputs,
                    text: quillText,
                    images: result,
                    date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                }).then(() => {
                    alert("등록이 완료되었습니다.");
                    navigate("/");
                    navigate(0);
                }).catch(err => console.log(`${err.code} - ${err.message}`));
            }
        }
    }

    const selectedToggle = () => {
        const food_category = document.querySelector(".food-category");
        food_category!.classList.toggle("active");
    }

    const selectedHover = () => {
        document.querySelector(".food-category")?.classList.remove("active");
    }

    const clickedMenu = (e: Event) => {
        const selectedValue = document.querySelector(".selected-value");
        const { value } = e.target as HTMLInputElement;
        if ((e.target as HTMLElement).tagName === "BUTTON") {
            (selectedValue as HTMLInputElement).value = value;
            (selectedValue as HTMLInputElement).innerText = value;
        }
    }

    const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        let fileLists: any = [...image];
        let previewLists: any = [...thumbnail];
        const maxSize = 5 * 1024 * 1024;

        // 파일 개수 체크 (코드 수정 필요)
        if (files!.length > 10 || fileLists.length > 10 || previewLists.length > 10) {
            alert("파일은 10개까지만 첨부 가능합니다.");
            fileLists = fileLists.slice(0, 10);
            previewLists = previewLists.slice(0, 10);
        }

        for (let i = 0; i < files!.length; i++) {
            // 파일 용량 체크
            if (files![i].size > maxSize) {
                alert("파일첨부 사이즈는 5MB 이내로 가능합니다.");
                e.target.value = "";
            } else {
                const currentUrl = URL.createObjectURL(files![i]);
                fileLists.push({ fileUrl: files![i] });
                previewLists.push({ fileUrl: currentUrl });
            }
        }
        setImage(fileLists); // db 저장용 파일(File)
        setThumbnail(previewLists); // 미리보기용 파일(string)
    }

    const dragEvent = (e: React.DragEvent<HTMLDivElement>, type: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === "drop") {

            let thisFile = e.dataTransfer.files[0];
            const maxSize = 5 * 1024 * 1024;
            let fileLists: any = [...thumbnail];

            // 파일 개수 체크
            if (fileLists.length > 10) {
                alert("파일은 10개까지만 첨부 가능합니다.");
                fileLists = fileLists.slice(0, 10);
            }
            // 파일 용량 체크
            if (thisFile.size > maxSize) {
                alert("파일첨부 사이즈는 5MB 이내로 가능합니다.");
                (e.target as HTMLInputElement).value = "";
            } else {
                const currentUrl = URL.createObjectURL(thisFile);
                fileLists.push(currentUrl);
                setThumbnail(fileLists);
            }

        }
    }

    const deleteImage = (id: any) => {
        setDeleteImages([...deleteImages, thumbnail[id]]);
        setThumbnail(thumbnail.filter((_, index) => index !== id));
    };

    const onChange = (e: any) => {
        let data_name;
        let value;
        if (typeof (e) === "string") {
            data_name = "text";
            value = e;
        } else {
            data_name = e.target.dataset["name"];
            value = e.target.value;
        }
        setInputs({
            ...inputs, [data_name]: value
        });
    }

    return (
        <form className="note-form" onSubmit={onSubmit}>
            <div className="input-wrap">
                <div className="input-box">
                    <label htmlFor="date_visited">방문일자</label>
                    <input type="date" name="date_visited" data-name="date_visited" onChange={onChange} />
                </div>
                <div className="select-box" onMouseLeave={selectedHover}>
                    <label htmlFor="foodCategory">카테고리</label>
                    <div className="selected">
                        <button type="button"
                            name="foodCategory"
                            className="selected-value"
                            onClick={selectedToggle}
                            value={isModify ? prevData!.foodCategory : ""}>
                            {isModify ? prevData!.foodCategory : ""}
                        </button>
                        <div className="arrow" onClick={selectedToggle}><RiArrowDownSLine size={"1.5em"} /></div>
                    </div>
                    <div className="food-category" >
                        <button type="button" data-name="foodCategory" value="한식" onClick={onChange}>한식</button>
                        <button type="button" data-name="foodCategory" value="양식" onClick={onChange}>양식</button>
                        <button type="button" data-name="foodCategory" value="중식" onClick={onChange}>중식</button>
                        <button type="button" data-name="foodCategory" value="일식" onClick={onChange}>일식</button>
                        <button type="button" data-name="foodCategory" value="아시아/퓨전" onClick={onChange}>아시아/퓨전</button>
                        <button type="button" data-name="foodCategory" value="카페" onClick={onChange}>카페</button>
                        <button type="button" data-name="foodCategory" value="기타" onClick={onChange}>기타</button>
                    </div>
                </div>
            </div>
            <div className="input-box">
                <button type="button" id="placeName" data-name="placeName" value={isModify ? prevData.placeName : ""} >
                    {isModify ? prevData.placeName : "위치를 선택하면 가게명이 입력됩니다."}
                </button>
            </div>
            <Map setInputs={setInputs} id={statedata.state ? statedata.state.id : ""} location={statedata.state ? statedata.state.data.location : {}} />
            <div className="file-box">
                <div className="drag-box"
                    onDrop={e => dragEvent(e, "drop")}
                    onDragOver={e => dragEvent(e, "over")}>
                    <FaDownload size={"3em"} />
                    <span className="drag-text">이미지를 여기에 드래그 해보세요!</span>
                    <span>5MB 이하, 10개 이하 첨부 가능</span>
                    <label htmlFor="input-file">이미지 선택</label>
                    <input type="file" id="input-file" accept="image/jpg, image/jpeg, image/png" onChange={saveFileImage} multiple />
                </div>
                <div className="preview-box">
                    <ul>
                        {thumbnail && thumbnail.slice(0, 5).map((image, id) => (
                            <li key={id}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${id}`} />
                                <span className="delete" onClick={() => deleteImage(id)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {thumbnail && thumbnail.slice(5, 10).map((image, id) => (
                            <li key={id}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${id}`} />
                                <span className="delete" onClick={() => deleteImage(id)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Editor quillText={quillText} setQuillText={setQuillText}
            prevData={statedata.state ? statedata.state.data : ""} />
            <div className="btn-wrap">
                <button type="button" onClick={() => navigate(-1)} className="back">뒤로</button>
                <button type="submit">완료</button>
            </div>
        </form>
    )
}