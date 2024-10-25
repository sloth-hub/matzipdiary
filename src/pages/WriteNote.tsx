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
import StarRating from "../Components/StarRating";

export const WriteNote = ({ userObj }: any) => {

    interface img {
        fileUrl: File
    }

    const statedata = useLocation();
    const navigate = useNavigate();

    const defaultNote: NoteInterface = {
        uid: userObj.uid,
        id: "",
        date_created: "",
        date_visited: "",
        foodCategory: "",
        location: { lat: 0, lng: 0 },
        rate: 0,
        text: "",
        placeName: "",
        images: []
    };

    const [inputs, setInputs] = useState<NoteInterface>(defaultNote);
    const [prevData, setPrevData] = useState<NoteInterface>(defaultNote);

    const [deleteImages, setDeleteImages] = useState<Images[]>([]);
    const [thumbnail, setThumbnail] = useState<Images[]>([]);
    const [image, setImage] = useState<img[]>([]);
    const [quillText, setQuillText] = useState<string>("");
    const [isModify, setIsModify] = useState<boolean>(false);
    const [isNoAdd, setIsNoAdd] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const maxSize = 5 * 1024 * 1024;
    const maxFiles = 10;
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const oversizedFiles: string[] = []; // 용량 초과 파일 저장 배열
    const invalidFiles: string[] = []; // 확장자 불일치 파일 저장 배열
    let alertMessage = "";

    useEffect(() => {
        const categories = document.querySelector(".food-category");
        categories!.addEventListener("click", (e: Event) => {
            clickedMenu(e);
        });
        if (statedata.state) {
            setIsModify(true);
            setPrevData(statedata.state.data);
            setInputs(statedata.state.data);
            (document.querySelector("input[type='date']") as HTMLInputElement)!.value = statedata.state.data.date_visited;
            setThumbnail(statedata.state.data.images);
        }
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const requiredInputs = [
            inputs["foodCategory"], inputs["date_visited"], inputs["placeName"], inputs["text"].replace(/(<([^>]+)>)/ig, "")
        ];
        if (requiredInputs.includes("") || inputs.rate === 0) {
            alert("필수 항목을 입력하세요.");
            setIsLoading(false);
        } else {
            if (isModify) {
                // 글 수정
                modifyNote();
            } else {
                // 새로 글쓰기
                newNote();
            }
        }
    }

    const newNote = async () => {
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
            images: result,
            date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
        }).then(() => {
            setIsLoading(false);
            alert("등록이 완료되었습니다.");
            navigate("/");
            navigate(0);
        }).catch(err => console.log(`${err.code} - ${err.message}`));
    }

    const modifyNote = async () => {
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
            setIsLoading(false);
            alert("수정이 완료되었습니다.");
            // 첫화면 + 새로고침
            navigate("/");
            navigate(0);
        }).catch(err => console.log(`${err.code} - ${err.message}`));
    }

    const selectedToggle = () => {
        const food_category = document.querySelector(".food-category");
        food_category!.classList.toggle("active");
    }

    const selectedHover = () => {
        document.querySelector(".food-category")!.classList.remove("active");
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
        checkedFile(files!);
    }

    const dragEvent = (e: React.DragEvent<HTMLDivElement>, type: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === "drop") {
            const { dataTransfer: { files } } = e;
            checkedFile(files!);
        }
    }

    const checkedFile = (files: FileList) => {

        let fileLists: img[] = [...image];
        let previewLists: Images[] = [...thumbnail];

        for (let i = 0; i < files!.length; i++) {
            const file = files![i];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();

            // 확장자 필터링
            if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                invalidFiles.push(file.name);
                continue;
            }
            // 파일 용량 체크
            if (file.size > maxSize) {
                oversizedFiles.push(file.name);
                continue;
            }

            if (fileLists.length >= maxFiles) break;

            const currentUrl = URL.createObjectURL(file);
            fileLists.push({ fileUrl: file });
            previewLists.push({ fileUrl: currentUrl });
        }

        // 파일 조건에 따른 알림 메시지
        if (fileLists.length > maxFiles || files!.length + fileLists.length > maxFiles) {
            alertMessage += `파일은 최대 10개까지만 첨부 가능합니다.`;
            fileLists = fileLists.slice(0, maxFiles);
            previewLists = previewLists.slice(0, maxFiles);
        }
        if (oversizedFiles.length > 0) {
            alertMessage += `다음 파일은 5MB를 초과합니다. : ${oversizedFiles.join(", ")}\n`;
        }
        if (invalidFiles.length > 0) {
            alertMessage += `다음 파일은 지원되지 않는 확장자 파일입니다. (png, jpg, jpeg만 가능) : ${invalidFiles.join(", ")}`;
        }

        // 알림 메시지가 있으면 alert 표시
        if (alertMessage) {
            alert(alertMessage.trim());
        }

        setImage(fileLists); // db 저장용 파일(File)
        setThumbnail(previewLists); // 미리보기용 파일(string)
    }

    const deleteImage = (index: number) => {
        setImage(image.filter((_, i) => i !== index));
        setDeleteImages([...deleteImages, thumbnail[index]]);
        setThumbnail(thumbnail.filter((_, i) => i !== index));
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

    const setPlaceName = (e: React.MouseEvent) => {
        e.preventDefault();
        const input = (document.querySelector("#placeName") as HTMLInputElement);
        setIsNoAdd(true);
        input.focus();
    }

    return (
        <form className="note-form" onSubmit={onSubmit}>
            <div className="input-wrap">
                <div className="input-box">
                    <label htmlFor="date_visited">방문일자<span className="required">*</span></label>
                    <input type="date" name="date_visited" data-name="date_visited" onChange={onChange} />
                </div>
                <div className="select-box" onMouseLeave={selectedHover}>
                    <label htmlFor="foodCategory">카테고리<span className="required">*</span></label>
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
                <label htmlFor="placeName">가게명<span className="required">*</span></label>
                {isNoAdd ?
                    <input type="text" id="placeName" data-name="placeName" onChange={onChange}
                        placeholder="가게명을 직접 입력해주세요." />
                    :
                    <button type="button" id="placeName" data-name="placeName" value={isModify ? prevData.placeName : ""} >
                        {isModify ? prevData.placeName : "위치를 선택하면 가게명이 입력됩니다."}
                    </button>
                }
            </div>
            <Map setInputs={setInputs} id={statedata.state ? statedata.state.id : ""} location={statedata.state ? statedata.state.data.location : {}} />
            <span className="self-input">※ 주소 검색 결과가 없을 경우 <button type="button" onClick={setPlaceName}>여기</button>를 눌러주세요.</span>
            <StarRating prevRate={prevData.rate ? prevData.rate : 0} setInputs={setInputs} inputs={inputs} />
            <div className="file-box">
                <div className="drag-box"
                    onDrop={e => dragEvent(e, "drop")}
                    onDragOver={e => dragEvent(e, "over")}>
                    <FaDownload size={"3em"} />
                    <span className="drag-text">이미지를 여기에 드래그 해보세요!</span>
                    <span>5MB 이하, 10개 이하 첨부 가능</span>
                    <label htmlFor="input-file">이미지 선택</label>
                    <input type="file" id="input-file"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={saveFileImage} multiple />
                </div>
                <div className="preview-box">
                    <ul>
                        {thumbnail && thumbnail.slice(0, 5).map((image, index) => (
                            <li key={index}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${index}`} />
                                <span className="delete" onClick={() => deleteImage(index)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {thumbnail && thumbnail.slice(5, 10).map((image, index) => (
                            <li key={5 + index}>
                                {/* @ts-ignore */}
                                <img src={image.fileUrl} alt={`thumbnail-${5 + index}`} />
                                <span className="delete" onClick={() => deleteImage(5 + index)}><IoIosClose size={"1.5em"} /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Editor quillText={quillText} setQuillText={setQuillText}
                prevData={statedata.state && statedata.state.data}
                setInputs={setInputs} inputs={inputs} />
            <div className="btn-wrap">
                <button type="button" onClick={() => navigate(-1)} className="back">뒤로</button>
                <button type="submit">완료</button>
            </div>
            <div className={isLoading ? "modal active" : "modal"}>
                <div className="write-loader">
                    <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" />
                </div>
            </div>
        </form>
    )
}