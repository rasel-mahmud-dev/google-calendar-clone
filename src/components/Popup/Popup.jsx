import React, {useEffect, useRef} from 'react';
// import Backdrop from "@/components/Backdrop";
import "./popup.scss"

const Popup = ({isOpen, className, isWithBackdrop, children, backdropClass = "", onClose, ...attr}) => {


    const popupRef = useRef(null)

    function handleBlur(e) {
        onClose(e)
    }

    useEffect(() => {
        if (isOpen) {
            popupRef.current.focus()
        }
    }, [isOpen]);


    return (
        <div>
            {/*{isWithBackdrop && isOpen && <Backdrop className={backdropClass} onClose={onClose}  />}*/}
            <div ref={popupRef} tabIndex={-1} onBlur={handleBlur}
                 className={`popup absolute rounded-md p-4 bg-white ${!isOpen ? "popup--close" : "popup--open"} ${className}`} {...attr}>
                {children}
            </div>
        </div>
    );
};

export default Popup;