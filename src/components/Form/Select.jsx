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

    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 12
    })

    const inputRootRef = useRef()


    function handleFocus(e) {
        setFocus(true)
        let rect = e.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.top + rect.height,
            left: rect.left,
            width: rect.width,
            display: "block"
        })
    }

    useEffect(() => {
        handleWindowResize()
    }, [dataList, selectedDateList, value])


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

    function closeDropdown(){
        setDropdownPosition({
           ...dropdownPosition,
            display: "none"
        })
    }

    useEffect(() => {
        window.addEventListener("resize", closeDropdown)
        return () => window.removeEventListener("resize", closeDropdown)
    }, [])



    function handleBlur(e) {

        console.log(e)

        setDropdownPosition({
            ...dropdownPosition,
            display: "none"
        })
        setFocus(false)




        // if (!renderOptions) {
        //     setFocus(false)
        //     setDropdownPosition({
        //         ...dropdownPosition,
        //         display: "none"
        //     })
        // }
        //
        // if ((isDiv && e.currentTarget.classList.contains("input-root"))) {
        //     setFocus(false)
        // }
    }

    function onClick() {

        setDropdownPosition({
            ...dropdownPosition,
            display: "none"
        }, (cb) => {
            setFocus(false)
        })
    }

    function handleValueSelect(val) {
        onChange(val)
        setDropdownPosition({
            ...dropdownPosition,
            display: "none"
        })
        setFocus(false)
    }


    return (
        <div className={`${className} input-root`} ref={inputRootRef}
             tabIndex={-1} onBlur={(e) => handleBlur(e, true)}
             onFocus={handleFocus}>

            <div className={`input-wrapper ${withBg ? "with-bg" : ""}  ${inputBg}`}>
                <div
                    {...attr}
                    className="input-select"
                >{label}</div>
            </div>
            <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>

            <Dropdown position={dropdownPosition}>
                {renderOptions && isFocus && (
                    <div className="suggestion-list">
                        {renderOptions(handleValueSelect)}
                    </div>
                )}
            </Dropdown>

        </div>
    );
};

export default Select;


