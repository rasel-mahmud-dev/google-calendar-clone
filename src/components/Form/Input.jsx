import React, {useState} from 'react';
import "./input.scss"

const Input = ({className="", type = "text", label, ...attr}) => {

    const [isFocus, setFocus] = useState(false)

    function handleFocus() {
        setFocus(true)
    }

    function handleBlur() {
        setFocus(false)
    }

    return (
        <div className={`${className} input-root`}>

            <div className="input-wrapper">
                <input onBlur={handleBlur} placeholder={label} onFocus={handleFocus} type={type} {...attr} />
            </div>
            <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>
        </div>
    );
};

export default Input;