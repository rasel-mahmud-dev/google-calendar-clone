import React, {useEffect, useState} from "react";

import {createPortal} from "react-dom";

const Backdrop = (props) => {
    const {isOpen, className = "", backdropRoot, onClose} = props;


    const handleBackdrop = (e) => {
        if (e.target.classList.contains("backdrop")) {
            onClose && onClose();
        }
    };

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    return mounted
        ? createPortal(<div
                onClick={handleBackdrop}
                className={`backdrop ${className} ${isOpen ? "backdrop--open" : "backdrop--close"}`}
            >{props.children}</div>,
            document.querySelector(backdropRoot ? `#${backdropRoot}` : "#backdrop_root"))
        : null

};

export default Backdrop;
