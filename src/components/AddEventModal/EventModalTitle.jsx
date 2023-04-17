import React from 'react';
import {TiTimes} from "react-icons/all";

const EventModalTitle = ({onClose, title = "", backElement }) => {
    return (

        <div className="flex items-center justify-between py-2 px-4">
            <h4 className="text-lg text-gray-800 font-medium flex items-center">
                {backElement && backElement()}
                {title ? title : "Add Event"}

            </h4>
        </div>


    );
};

export default EventModalTitle;