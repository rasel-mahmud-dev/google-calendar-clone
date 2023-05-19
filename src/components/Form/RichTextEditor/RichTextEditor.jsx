import React, {Suspense} from 'react';

import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css';
import {lazy} from "yup";
import "./style.scss"
import {RiseLoader} from "react-spinners";


import ReactQuill from "react-quill"




class RichTextEditor extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isFocus: false
        }
    }


    handleFocus=()=>{
        this.setState({
            isFocus: true
        })
    }

    handleBlur=()=>{
        this.setState({
            isFocus: false
        })
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
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

        const {className} = this.props

        return (
            <div className="rich-texteditor">
                <div className={`rich-textarea ${className} input-root`}>
                    <Suspense fallback={<RiseLoader size={20} />}>
                        <ReactQuill
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            {...this.props}
                        />
                    </Suspense>
                    <div className={`input-border ${this.state.isFocus ? "input-border-focus" : "input-border-blur"}`}></div>
                </div>

            </div>
        )
    }
}


export default RichTextEditor;