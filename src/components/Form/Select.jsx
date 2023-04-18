import React, {useState} from 'react';
import Dropdown from "../Dropdown/Dropdown";

const Select = (props) => {

    const {
        className = "",
        withBg = false,
        dropdownOptionCls = "",
        value,
        label,
        render,
        onChange,
        dropdownClass = "",
        renderPlaceholderValue,
        placeholderClass=""
    } = props

    const [active, setActive] = useState(false)

    function handleOnChangeValue(val) {
        onChange(val)
        setActive(false)
    }

    function handleToggle() {
        if (active) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    function handleBlur() {
        setActive(false)
    }




    return (
        <li className={`relative cursor-pointer ${withBg ? "with-bg" : ""} mui-select ${className}`} onBlur={handleBlur}
            tabIndex="-1" aria-hidden={true}>
            <Dropdown className={dropdownClass + " w-full"} onChange={handleOnChangeValue} isOpen={active} render={(change) => (

                    render(change)

            )}/>
            <div
                className={`font-medium ${placeholderClass ? placeholderClass : ""} mui-select-placeholder text-gray-600 hover:bg-gray-100 cursor-pointer py-2 rounded relative w-full `}
                onClick={handleToggle}>
                <span>{ value ? (renderPlaceholderValue ? renderPlaceholderValue(value) : value) : label }</span>
                <div className={`input-border ${active ? "input-border-active" : "input-border-inactive"} `}></div>
            </div>
        </li>

    );
};

export default Select;