import React, {useState} from 'react';

const TextArea = ({className="",  label, ...attr}) => {

    const [isFocus, setFocus] = useState(false)

    function handleFocus() {
        setFocus(true)
    }

    function handleBlur() {
        setFocus(false)
    }

    return (
        <div>
            <div className={`textarea ${className} input-root`}>

                <div className="input-wrapper">
                    <textarea onBlur={handleBlur} placeholder={label} onFocus={handleFocus} {...attr} />
                </div>
                <div className={`input-border ${isFocus ? "input-border-focus" : "input-border-blur"}`}></div>
            </div>
        </div>
    );
};

export default TextArea;