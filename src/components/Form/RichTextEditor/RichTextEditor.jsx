import React from 'react';
import ReactQuill from "react-quill";

import "./style.scss"


import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css';


class RichTextEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 'link', 'image']
        ],
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]


    render() {
        return (
            <div className="rich-texteditor">

                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    {...this.props}
                />
            </div>
        )
    }
}


export default RichTextEditor;