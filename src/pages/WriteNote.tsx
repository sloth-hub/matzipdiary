import React, { useEffect, useState } from "react";
import { NoteInterface, Images } from "../interfaces/note.interface";
import Map from "../Components/Map";
import { useNavigate } from "react-router";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { ref, getDownloadURL, uploadString, updateMetadata, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../Firebase";
import { v4 as uuid4 } from "uuid";
import moment from "moment";

export const WriteNote = ({ userObj }: any) => {

    interface img {
        fileUrl: File
    }

    const [inputs, setInputs] = useState<NoteInterface>({
        uid: userObj.uid,
        date_created: "",
        date_visited: "",
        foodCategory: "",
        location: { lat: 0, lng: 0 },
        text: "",
        placeName: "",
        images: []
    });

    const { uid } = inputs;

    const [file, setFile] = useState<Images[]>([]);
    const [image, setImage] = useState<img[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const categories = document.querySelector(".food-category");
        categories!.addEventListener("click", (e: Event) => {
            clickedMenu(e);
        });
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (file.length > 0) {
            const result = await Promise.all(
                image.map(async (v, _) => {
                    const fileRef = ref(storage, `${uid}/${uuid4()}`);
                    await uploadBytes(fileRef, v.fileUrl);
                    const data = await updateMetadata(fileRef, { contentType: "image/jpeg" });
                    const resultUrl = await getDownloadURL(fileRef);
                    return { fileUrl: resultUrl };
                })
            );
            await addDoc(collection(db, "notes"), {
                ...inputs,
                images: result,
                date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
            }).then(() => {
                alert("등록이 완료되었습니다.");
                navigate("/");
            }).catch(err => console.log(`${err.code} - ${err.message}`));
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
        let previewLists: any = [...file];
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
        setFile(previewLists); // 미리보기용 파일(string)
    }

    const dragEvent = (e: React.DragEvent<HTMLDivElement>, type: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === "drop") {

            let thisFile = e.dataTransfer.files[0];
            const maxSize = 5 * 1024 * 1024;
            let fileLists: any = [...file];

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
                setFile(fileLists);
            }

        }
    }

    const deleteImage = (id: any) => {
        setFile(file.filter((_, index) => index !== id));
    };

    const onChange = (e: any) => {
        let data_name;
        let value;
        if (e.type === "text") {
            data_name = e.dataset["name"];
            value = e.value;
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
                    <label htmlFor="foodCategory">음식 카테고리</label>
                    <div className="selected">
                        <button type="button" name="foodCategory" className="selected-value" onClick={selectedToggle}>
                        </button>
                        <div className="arrow" onClick={selectedToggle}><RiArrowDownSLine size={"1.5em"} /></div>
                    </div>
                    <ul className="food-category" >
                        <button type="button" data-name="foodCategory" value="한식" onClick={onChange}>한식</button>
                        <button type="button" data-name="foodCategory" value="양식" onClick={onChange}>양식</button>
                        <button type="button" data-name="foodCategory" value="중식" onClick={onChange}>중식</button>
                        <button type="button" data-name="foodCategory" value="일식" onClick={onChange}>일식</button>
                        <button type="button" data-name="foodCategory" value="아시아/퓨전" onClick={onChange}>아시아/퓨전</button>
                        <button type="button" data-name="foodCategory" value="카페" onClick={onChange}>카페</button>
                    </ul>
                </div>
            </div>
            <div className="input-box">
                <button type="button" id="placeName" data-name="placeName" >
                    위치를 선택하면 가게명이 입력됩니다.
                </button>
            </div>
            <Map inputs={inputs} setInputs={setInputs} />
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
                        {file && file.slice(0, 5).map((image, id) => (
                            <li key={id}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${id}`} />
                                <span className="delete" onClick={() => deleteImage(id)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {file && file.slice(5, 10).map((image, id) => (
                            <li key={id}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${id}`} />
                                <span className="delete" onClick={() => deleteImage(id)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <textarea name="text" id="text" data-name="text" placeholder="솔직한 후기를 남겨보세요!" onChange={onChange} />
            <div className="btn-wrap">
                <button type="button" onClick={() => navigate("/")} className="back">뒤로</button>
                <button type="submit">완료</button>
            </div>
        </form>
    )
}