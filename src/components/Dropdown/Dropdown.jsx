import React from 'react';

import "./styles.scss"

const Dropdown = ({isOpen = false, render, onChange, className=""}) => {

    function handleChange(item) {
        onChange(item)
    }

    return isOpen ? (
        <div className={`${className} dropdown-my custom-scrollbar absolute shadow-dropdown bg-white top-10 left-0 rounded-lg overflow-hidden `}>
            <div>
                {render(handleChange)}
            </div>
        </div>
    ) : null


};

export default Dropdown;