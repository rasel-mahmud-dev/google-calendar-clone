import React, {useEffect, useRef, useState} from 'react';
import "./input.scss"
import {createPortal} from "react-dom";
import Dropdown from "./Dropdown";
import {is, tr} from "date-fns/locale";

const Input = React.forwardRef((props, ref) => {

const {className = "", withBg = false, inputBg = "", type = "text", dataList, selectedDateList, onClickItem, showSuggestion, label, ...attr} = props

    const [isFocus, setFocus] = useState(false)

    function handleFocus(e) {

        setFocus(true)

    }



    function handleBlur(e) {
        setFocus(false)
    }


    function onClick(item){
        onClickItem(item)
        setFocus(false)
    }


    return (
        <div className={`${className} input-root`}
             tabIndex={-1} onBlur={(e) => handleBlur(e)}
             onFocus={handleFocus}>

            <div className={`input-wrapper ${withBg ? "with-bg" : ""}  ${inputBg}`}>
                <input
                    ref={ref}
                    onBlur={(e) => handleBlur(e)}
                    onClick={()=>handleFocus()}
                    placeholder={label}
                    onFocus={handleFocus}
                    type={type}
                    {...attr}
                />
            </div>
            <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>
                {showSuggestion && isFocus && (
                    <div className="suggestion-list">
                        {showSuggestion(onClick)}
                    </div>
                )}


        </div>
    );
})

export default Input;


