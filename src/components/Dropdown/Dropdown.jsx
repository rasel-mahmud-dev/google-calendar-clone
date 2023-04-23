// import React from 'react';
// import "./styles.scss"
//
// const Dropdown = ({isOpen = false, render, onClose, onChange, className = "", backdropClass=""}) => {
//
//     function handleChange(item) {
//         onChange(item)
//     }
//
//     return (
//         <>
//             {/*<div onClick={() => onClose()} className={`backdrop ${backdropClass} ${isOpen ? "open-backdrop" : "close-backdrop"}`}></div>*/}
//             {isOpen && (
//                 <div
//                     className={`${className} dropdown-my custom-scrollbar absolute shadow-dropdown bg-white top-10 left-0 rounded-lg `}>
//                     <div>
//                         {render(handleChange)}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// };
//
//
// export default Dropdown;


import React from 'react';

import "./styles.scss"


const Dropdown = ({isOpen = false, render, onChange, className=""}) => {

    function handleChange(item) {
        onChange(item)
    }


    return isOpen ? (
        <div className={`${className} dropdown-my custom-scrollbar absolute shadow-dropdown  top-11 left-0`}>
            <div>
                {render(handleChange)}
            </div>
        </div>
    ) : null
};

export default Dropdown;