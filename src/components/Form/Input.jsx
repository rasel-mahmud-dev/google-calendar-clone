import React, {useEffect, useRef, useState} from 'react';
import "./input.scss"
import {createPortal} from "react-dom";
import Dropdown from "./Dropdown";

const Input = ({className = "", withBg = false, inputBg = "", type = "text", dataList, selectedDateList, onClickItem, showSuggestion, label, ...attr}) => {

    const [isFocus, setFocus] = useState(false)

    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 12
    })

    const inputRootRef = useRef()


    function handleFocus(e) {
        setFocus(true)

        if (showSuggestion) {

            let rect = e.currentTarget.getBoundingClientRect();
            setDropdownPosition({
                top: rect.top + rect.height,
                left: rect.left,
                width: rect.width
            })
        }
    }

    useEffect(()=>{
        handleWindowResize()
    }, [dataList, selectedDateList])


    function handleWindowResize() {
        if (inputRootRef.current) {
            let rect = inputRootRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.top + rect.height,
                left: rect.left,
                width: rect.width,
                display: "block"
            })
        }

    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])


    function handleBlur(e, isDiv) {
        if (!showSuggestion) {
            setFocus(false)
            setDropdownPosition({
                ...dropdownPosition,
                display: "none"
            })
        }

        if((isDiv && e.currentTarget.classList.contains("input-root"))){
            setFocus(false)
        }
    }

    function forceBlur() {
        setFocus(false)
    }



    return (
        <div className={`${className} input-root`} ref={inputRootRef}
             tabIndex={-1} onBlur={(e) => handleBlur(e, true)}
             onFocus={handleFocus}>

            <div className={`input-wrapper ${withBg ? "with-bg" : ""}  ${inputBg}`}>
                <input
                    onBlur={(e) => handleBlur(e)}
                    placeholder={label}
                    onFocus={handleFocus}
                    type={type}
                    {...attr}
                />
            </div>
            <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>

            <Dropdown position={dropdownPosition}>

                {showSuggestion && isFocus && (
                    <div className="suggestion-list">
                        {showSuggestion()}
                    </div>
                )}
            </Dropdown>

        </div>
    );
};

export default Input;


