import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
    onChange: (value: any) => void;
}
export const Editor = ({ onChange }: Props) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }]
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
        <div>
            <ReactQuill
                onChange={onChange}
                placeholder="솔직한 후기를 남겨보세요!"
                modules={modules}
                formats={formats}
                data-name="text"
            />
        </div>
    );
}

export default Editor;