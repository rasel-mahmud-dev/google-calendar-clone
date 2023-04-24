import React from 'react';

import "./modal.scss"
const Modal = ({isOpen, onClose, backdropClass="", className="", children}) => {
    return (
        <div>
            <div onClick={()=>onClose()} className={`backdrop ${backdropClass} ${isOpen ? "open-backdrop" : "close-backdrop"}`} ></div>
            <div className={`modal ${className} ${isOpen ? "open-modal" : "close-modal"}`} >
                {children}
            </div>
        </div
        >
    );
};

export default Modal;