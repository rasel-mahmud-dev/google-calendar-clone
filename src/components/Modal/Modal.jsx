import React from 'react';

import "./modal.scss"
const Modal = ({isOpen, onClose, children}) => {
    return (
        <div>
            <div onClick={()=>onClose()} className={`backdrop ${isOpen ? "open-backdrop" : "close-backdrop"}`} ></div>
            <div  className={`modal ${isOpen ? "open-modal" : "close-modal"}`} >
                {children}
            </div>
        </div
        >
    );
};

export default Modal;