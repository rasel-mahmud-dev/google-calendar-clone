import React from 'react';
import Backdrop from "@/components/Backdrop";

const Popup = ({isOpen, className, isWithBackdrop, children, backdropClass="", onClose, ...attr}) => {
    return (
        <div>
            {isWithBackdrop && isOpen && <Backdrop className={backdropClass} onClose={onClose}  />}
            <div className={`popup absolute rounded-md p-4 bg-white ${!isOpen ? "popup--close" : "popup--open"} ${className}`} {...attr}>
                {children}
            </div>
        </div>
    );
};

export default Popup;