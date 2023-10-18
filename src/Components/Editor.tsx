import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { NoteInterface } from "../interfaces/note.interface";

type Props = {
    quillText: any;
    setQuillText: (value: any) => void;
    prevData: any;
}
export const Editor = ({ quillText, setQuillText, prevData }: Props) => {

    useEffect(() => {
        if (prevData) {
            setQuillText(prevData.text);
        }
    }, []);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }, {
                'color': [
                    "#181818", "#331C5C", "#1C385C", "#1C5C44", "#81741C", "#9B400B", "#921C11",
                    "#515152", "#563096", "#305C96", "#309671", "#B8A72B", "#EB720A", "#DC2918",
                    "#838386", "#7E5CB8", "#5C84B8", "#5CB896", "#D0C258", "#F5943D", "#E65C4C",
                    "#cdcbcb", "#A48DCC", "#8DA8CC", "#8DCCB5", "#DED58B", "#F8B882", "#EE948B",
                    "#ffffff", "#C9BCE0", "#BCCDE0", "#BCE0D2", "#EBE6BB", "#FBD1B2", "#F5BCB8"
                ]
            }, {
                'background': [
                    "#181818", "#331C5C", "#1C385C", "#1C5C44", "#81741C", "#9B400B", "#921C11",
                    "#515152", "#563096", "#305C96", "#309671", "#B8A72B", "#EB720A", "#DC2918",
                    "#838386", "#7E5CB8", "#5C84B8", "#5CB896", "#D0C258", "#F5943D", "#E65C4C",
                    "#cdcbcb", "#A48DCC", "#8DA8CC", "#8DCCB5", "#DED58B", "#F8B882", "#EE948B",
                    "#ffffff", "#C9BCE0", "#BCCDE0", "#BCE0D2", "#EBE6BB", "#FBD1B2", "#F5BCB8"
                ]
            }]
        ]
    }

    const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    return (
        <ReactQuill
            onChange={(e)=> setQuillText(e)}
            placeholder="솔직한 후기를 남겨보세요!"
            modules={modules}
            formats={formats}
            data-name="text"
            value={quillText}
        />
    );
}

export default Editor;