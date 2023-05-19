import React from 'react';
import {TiTimes} from "react-icons/ti";


const EventModalTitle = ({onClose, title = "", backElement, className = ""}) => {
    return (

        <div className={`flex items-center justify-between py-2 pl-0 pr-2 ${className}`}>
            <h4 className="text-lg text-gray-800 font-medium flex items-center">
                {backElement && backElement()}
                {title ? title : "Add Event"}
            </h4>
            <div className="close-btn">
                <TiTimes  className="text-gray-500 cursor-pointer hover:text-red-500" onClick={onClose}/>
            </div>
        </div>


    );
};

export default EventModalTitle;