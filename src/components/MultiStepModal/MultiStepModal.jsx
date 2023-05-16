import React from 'react';

const MultiStepModal = (props) => {

    const {className, isOpen, backdropClass = "", children, onClose} = props

    return (
        <div>
            <div onClick={() => onClose()}
                 className={`backdrop ${backdropClass} ${isOpen ? "open-backdrop" : "close-backdrop"}`}></div>
            <div className={`multi-step-modal overflow-x-hidden ${className} ${isOpen ? "open_modal" : "close_modal"}`}>
                {children}
            </div>
        </div>
    );
};

export default MultiStepModal;