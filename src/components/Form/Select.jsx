import React, {useEffect, useRef, useState} from 'react';
import "./input.scss"
import {createPortal} from "react-dom";
import Dropdown from "./Dropdown";

const Select = ({
                    className = "",
                    withBg = false,
                    inputBg = "",
                    type = "text",
                    dataList,
                    value,
                    selectedDateList,
                    onClickItem,
                    renderOptions, onChange,
                    label,
                    ...attr
                }) => {

    const [isFocus, setFocus] = useState(false)


    function handleFocus() {
        setFocus(true)
    }

    function handleBlur(e, isDiv) {
        setFocus(false)
    }



    function handleValueSelect(val) {
        onChange(val)
        setFocus(false)
    }


    return (
        <div className={`${className} input-root`}
             tabIndex={-1} onBlur={(e) => handleBlur(e, true)}
             onFocus={handleFocus}

        >

            <div className={`input-wrapper ${withBg ? "with-bg" : ""}  ${inputBg}`} >
                <div onClick={handleFocus}
                    {...attr}
                    className="input-select"
                >{label}</div>
            </div>
            <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>

                {renderOptions && isFocus && (
                    <div className="suggestion-list">
                        {renderOptions(handleValueSelect)}
                    </div>
                )}

        </div>
    );
};

export default Select;


